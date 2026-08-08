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
  <article class="surface-card panel-sizing animate-fade-in">
    <header>
      <h2 class="article-title mb-8 text-2xl text-paper sm:text-[32px]">博客</h2>
    </header>

    <section class="mb-2.5">
      <ul class="grid grid-cols-1 gap-5 sm:gap-8 md:grid-cols-2">
        <li v-for="post in posts" :key="post.slug">
          <RouterLink
            :to="`/blog/${post.slug}`"
            class="gradient-card gradient-card--solid group block h-full overflow-hidden rounded-2xl shadow-soft"
          >
            <figure class="blog-cover" :class="`blog-cover--${post.cover}`">
              <ion-icon :name="coverIcons[post.cover]"></ion-icon>
              <span>{{ post.category }}</span>
            </figure>
            <div class="p-4 sm:p-6">
              <div class="mb-2.5 flex items-center gap-[7px]">
                <p class="text-sm font-light text-mist-70">{{ post.category }}</p>
                <span class="h-1 w-1 rounded-full bg-mist-70"></span>
                <time :datetime="post.date" class="text-sm font-light text-mist-70">{{ formatDate(post.date) }}</time>
              </div>
              <h3 class="mb-2.5 text-lg leading-[1.3] text-paper transition-colors duration-[250ms] group-hover:text-gold sm:text-2xl">
                {{ post.title }}
              </h3>
              <p class="text-justify text-sm leading-[1.6] font-light text-mist sm:text-[15px]">{{ post.summary }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </section>
  </article>
</template>
