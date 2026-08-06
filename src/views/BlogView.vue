<script setup lang="ts">
import { posts } from '../data/posts'

const coverIcons = {
  ai: 'sparkles-outline',
  rag: 'git-network-outline',
  testing: 'shield-checkmark-outline',
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(`${date}T00:00:00`))
}
</script>

<template>
  <article class="blog active" data-page="blog">
    <header>
      <h2 class="h2 article-title">博客</h2>
    </header>

    <section class="blog-posts">
      <ul class="blog-posts-list">
        <li v-for="post in posts" :key="post.slug" class="blog-post-item">
          <RouterLink :to="`/blog/${post.slug}`">
            <figure class="blog-banner-box blog-cover" :class="`blog-cover--${post.cover}`">
              <ion-icon :name="coverIcons[post.cover]"></ion-icon>
              <span>{{ post.category }}</span>
            </figure>
            <div class="blog-content">
              <div class="blog-meta">
                <p class="blog-category">{{ post.category }}</p>
                <span class="dot"></span>
                <time :datetime="post.date">{{ formatDate(post.date) }}</time>
              </div>
              <h3 class="h3 blog-item-title">{{ post.title }}</h3>
              <p class="blog-text">{{ post.summary }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </section>
  </article>
</template>
