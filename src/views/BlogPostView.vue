<script setup lang="ts">
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { findPost } from '../data/posts'

const route = useRoute()
const post = computed(() => findPost(String(route.params.slug ?? '')))
const renderedContent = computed(() => {
  if (!post.value) return ''
  const rawHtml = marked.parse(post.value.content, { gfm: true }) as string
  return DOMPurify.sanitize(rawHtml)
})

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
      <section class="markdown-body" v-html="renderedContent"></section>
    </template>

    <div v-else class="empty-state">
      <ion-icon name="document-text-outline"></ion-icon>
      <p class="eyebrow">404</p>
      <h2 class="h2">文章未找到</h2>
      <p>这篇文章不存在，可能已经改名或移动。</p>
      <RouterLink class="primary-link" to="/blog">返回博客</RouterLink>
    </div>
  </article>
</template>
