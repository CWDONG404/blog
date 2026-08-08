<script setup lang="ts">
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { computed, nextTick, onBeforeUnmount, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { findPost, posts } from '../data/posts'

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

/** 上一篇 / 下一篇（posts 已按日期倒序 + order 排序） */
const postIndex = computed(() => posts.findIndex((item) => item.slug === post.value?.slug))
const prevPost = computed(() => (postIndex.value > 0 ? posts[postIndex.value - 1] : undefined))
const nextPost = computed(() => (postIndex.value >= 0 && postIndex.value < posts.length - 1 ? posts[postIndex.value + 1] : undefined))

/** 中文阅读时长估算：约 400 字 / 分钟 */
const readingMinutes = computed(() => {
  if (!post.value) return 0
  const chars = post.value.content.replace(/\s/g, '').length
  return Math.max(1, Math.round(chars / 400))
})

const articleContent = computed(() => {
  if (!post.value) return { html: '', toc: [] as TocItem[] }
  const rawHtml = marked.parse(post.value.content, { gfm: true }) as string
  const safeHtml = DOMPurify.sanitize(rawHtml)
  const documentFragment = new DOMParser().parseFromString(safeHtml, 'text/html')
  const toc: TocItem[] = []
  const usedIds = new Map<string, number>()

  documentFragment.querySelectorAll<HTMLHeadingElement>('h2, h3').forEach((heading, index) => {
    const text = heading.textContent?.trim() || `章节 ${index + 1}`
    const baseId =
      text
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
  headingObserver = new IntersectionObserver(
    (entries) => {
      const visibleHeading = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top)[0]

      if (visibleHeading?.target.id) activeHeading.value = visibleHeading.target.id
    },
    { rootMargin: '-90px 0px -70% 0px', threshold: [0, 1] },
  )

  headings.forEach((heading) => headingObserver?.observe(heading))
}

/** 为代码块注入复制按钮 */
function enhanceCodeBlocks() {
  articleBody.value?.querySelectorAll('pre').forEach((pre) => {
    if (pre.querySelector('.code-copy-btn')) return

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'code-copy-btn'
    button.innerHTML = '<ion-icon name="copy-outline"></ion-icon><span>复制</span>'
    button.addEventListener('click', async () => {
      const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? ''
      const label = button.querySelector('span')
      try {
        await navigator.clipboard.writeText(code)
        button.classList.add('copied')
        if (label) label.textContent = '已复制'
        window.setTimeout(() => {
          button.classList.remove('copied')
          if (label) label.textContent = '复制'
        }, 1600)
      } catch {
        if (label) label.textContent = '复制失败'
      }
    })
    pre.appendChild(button)
  })
}

function scrollToHeading(id: string) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({
    behavior: reduceMotion ? 'auto' : 'smooth',
    block: 'start',
  })
  activeHeading.value = id
}

watch(
  renderedContent,
  async () => {
    await nextTick()
    observeHeadings()
    enhanceCodeBlocks()
  },
  { immediate: true },
)

onBeforeUnmount(() => headingObserver?.disconnect())

watchEffect(() => {
  document.title = post.value ? `${post.value.title} · CWD` : '文章未找到 · CWD'
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (description && post.value) description.content = post.value.summary
})

function formatDate(date: string) {
  return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(`${date}T00:00:00`))
}
</script>

<template>
  <article class="blog-post-detail surface-card panel-sizing animate-fade-in">
    <template v-if="post">
      <header class="mb-8">
        <RouterLink class="back-link" to="/blog"><ion-icon name="arrow-back-outline"></ion-icon>返回博客</RouterLink>
        <p class="mt-5 text-sm text-vegas-gold sm:text-[15px]">{{ post.category }}</p>
        <h2 class="article-title mt-3 mb-4 text-2xl leading-[1.35] text-paper sm:text-[32px]">{{ post.title }}</h2>
        <p class="mb-3 text-sm leading-[1.7] text-mist sm:text-[15px]">{{ post.summary }}</p>
        <div class="flex items-center gap-2 text-sm text-mist-70">
          <time :datetime="post.date">发布于 {{ formatDate(post.date) }}</time>
          <span class="h-1 w-1 rounded-full bg-mist-70"></span>
          <span>约 {{ readingMinutes }} 分钟</span>
        </div>
      </header>

      <div class="flex min-w-0 flex-col">
        <section ref="articleBody" class="markdown-body" v-html="renderedContent"></section>

        <details v-if="tocItems.length" class="post-toc post-toc--mobile">
          <summary class="post-toc-summary">
            <span><ion-icon name="list-outline"></ion-icon>文章目录</span>
            <span class="post-toc-count">{{ tocItems.length }} 个章节</span>
          </summary>
          <ol>
            <li v-for="item in tocItems" :key="item.id" :class="`toc-level-${item.level}`">
              <button type="button" :class="{ active: activeHeading === item.id }" @click="scrollToHeading(item.id)">
                {{ item.text }}
              </button>
            </li>
          </ol>
        </details>

        <nav v-if="prevPost || nextPost" class="mt-10 grid gap-3 border-t border-jet pt-6 sm:grid-cols-2" aria-label="文章导航">
          <RouterLink v-if="prevPost" :to="`/blog/${prevPost.slug}`" class="post-nav-link">
            <span class="post-nav-label"><ion-icon name="arrow-back-outline"></ion-icon>上一篇</span>
            <span class="post-nav-title">{{ prevPost.title }}</span>
          </RouterLink>
          <RouterLink v-if="nextPost" :to="`/blog/${nextPost.slug}`" class="post-nav-link sm:col-start-2 sm:text-right">
            <span class="post-nav-label sm:justify-end">下一篇<ion-icon name="arrow-forward-outline"></ion-icon></span>
            <span class="post-nav-title">{{ nextPost.title }}</span>
          </RouterLink>
        </nav>
      </div>
    </template>

    <div v-else class="flex min-h-[430px] flex-col items-center justify-center gap-3.5 text-center text-mist">
      <ion-icon name="document-text-outline" class="text-[58px] text-gold"></ion-icon>
      <p class="tracking-[2px] text-vegas-gold">404</p>
      <h2 class="text-2xl text-paper sm:text-[32px]">文章未找到</h2>
      <p>这篇文章不存在，可能已经改名或移动。</p>
      <RouterLink class="primary-link" to="/blog">返回博客</RouterLink>
    </div>
  </article>

  <aside v-if="post && tocItems.length" class="post-toc post-toc--desktop" aria-label="文章目录">
    <p class="post-toc-title"><ion-icon name="list-outline"></ion-icon>文章目录</p>
    <ol>
      <li v-for="item in tocItems" :key="item.id" :class="`toc-level-${item.level}`">
        <button type="button" :class="{ active: activeHeading === item.id }" @click="scrollToHeading(item.id)">
          {{ item.text }}
        </button>
      </li>
    </ol>
  </aside>
</template>
