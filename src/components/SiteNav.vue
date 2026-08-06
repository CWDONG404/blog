<script setup lang="ts">
const links = [
  { label: '关于', to: '/' },
  { label: '履历', to: '/resume' },
  { label: '项目', to: '/portfolio' },
  { label: '博客', to: '/blog' },
  { label: '技术栈', to: '/stack' },
]
</script>

<template>
  <nav class="navbar" aria-label="主导航">
    <ul class="navbar-list">
      <li v-for="link in links" :key="link.to" class="navbar-item">
        <RouterLink class="navbar-link" :to="link.to" active-class="active" :exact-active-class="link.to === '/' ? 'active' : undefined">
          {{ link.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
