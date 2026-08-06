<script setup lang="ts">
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { computed, nextTick, onBeforeUnmount, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { findPost } from '../data/posts'

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

const route = useRoute()
const post = computed(() => findPost(String(route.params.slug ?? '')))
const articleBody = ref<HTMLElement | null>(null)
const activeHeading = ref('')
let headingObserver: IntersectionObserver | undefined

const articleContent = computed(() => {
  if (!post.value) return { html: '', toc: [] as TocItem[] }
  const rawHtml = marked.parse(post.value.content, { gfm: true }) as string
  const safeHtml = DOMPurify.sanitize(rawHtml)
  const documentFragment = new DOMParser().parseFromString(safeHtml, 'text/html')
  const toc: TocItem[] = []
  const usedIds = new Map<string, number>()

  documentFragment.querySelectorAll<HTMLHeadingElement>('h2, h3').forEach((heading, index) => {
    const text = heading.textContent?.trim() || `章节 ${index + 1}`
    const baseId = text
      .toLocaleLowerCase('zh-CN')
      .replace(/\s+/g, '-')
      .replace(/[^\p{L}\p{N}-]/gu, '') || `section-${index + 1}`
    const duplicateIndex = usedIds.get(baseId) ?? 0
    usedIds.set(baseId, duplicateIndex + 1)
    const id = duplicateIndex === 0 ? baseId : `${baseId}-${duplicateIndex + 1}`

    heading.id = id
    toc.push({ id, text, level: heading.tagName === 'H2' ? 2 : 3 })
  })

  return { html: documentFragment.body.innerHTML, toc }
})
const renderedContent = computed(() => articleContent.value.html)
const tocItems = computed(() => articleContent.value.toc)

function observeHeadings() {
  headingObserver?.disconnect()
  const headings = articleBody.value?.querySelectorAll<HTMLElement>('h2[id], h3[id]')
  if (!headings?.length) return

  activeHeading.value = headings[0].id
  headingObserver = new IntersectionObserver((entries) => {
    const visibleHeading = entries
      .filter((entry) => entry.isIntersecting)
      .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0]

    if (visibleHeading?.target.id) activeHeading.value = visibleHeading.target.id
  }, { rootMargin: '-90px 0px -70% 0px', threshold: [0, 1] })

  headings.forEach((heading) => headingObserver?.observe(heading))
}

function scrollToHeading(id: string) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start',
  })
  activeHeading.value = id
}

watch(renderedContent, async () => {
  await nextTick()
  observeHeadings()
}, { immediate: true })

onBeforeUnmount(() => headingObserver?.disconnect())

watchEffect(() => {
  document.title = post.value ? `${post.value.title} · CWD` : '文章未找到 · CWD'
})

function formatDate(date: string) {
  return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(`${date}T00:00:00`))
}
</script>

<template>
  <article class="blog-post-detail active">
    <template v-if="post">
      <header class="post-header">
        <RouterLink class="back-link" to="/blog"><ion-icon name="arrow-back-outline"></ion-icon>返回博客</RouterLink>
        <p class="post-category">{{ post.category }}</p>
        <h2 class="h2 article-title">{{ post.title }}</h2>
        <p class="post-summary">{{ post.summary }}</p>
        <time :datetime="post.date">发布于 {{ formatDate(post.date) }}</time>
      </header>
      <div class="post-reading-layout">
        <section ref="articleBody" class="markdown-body" v-html="renderedContent"></section>

        <details v-if="tocItems.length" class="post-toc post-toc--mobile">
          <summary class="post-toc-summary">
            <span><ion-icon name="list-outline"></ion-icon>文章目录</span>
            <span class="post-toc-count">{{ tocItems.length }} 个章节</span>
          </summary>
          <ol>
            <li v-for="item in tocItems" :key="item.id" :class="`toc-level-${item.level}`">
              <button
                type="button"
                :class="{ active: activeHeading === item.id }"
                @click="scrollToHeading(item.id)"
              >
                {{ item.text }}
              </button>
            </li>
          </ol>
        </details>

      </div>
    </template>

    <div v-else class="empty-state">
      <ion-icon name="document-text-outline"></ion-icon>
      <p class="eyebrow">404</p>
      <h2 class="h2">文章未找到</h2>
      <p>这篇文章不存在，可能已经改名或移动。</p>
      <RouterLink class="primary-link" to="/blog">返回博客</RouterLink>
    </div>
  </article>

  <aside v-if="post && tocItems.length" class="post-toc post-toc--desktop" aria-label="文章目录">
    <p class="post-toc-title"><ion-icon name="list-outline"></ion-icon>文章目录</p>
    <ol>
      <li v-for="item in tocItems" :key="item.id" :class="`toc-level-${item.level}`">
        <button
          type="button"
          :class="{ active: activeHeading === item.id }"
          @click="scrollToHeading(item.id)"
        >
          {{ item.text }}
        </button>
      </li>
    </ol>
  </aside>
</template>
