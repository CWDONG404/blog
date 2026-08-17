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
  <nav class="navbar-shell" aria-label="主导航">
    <ul class="flex flex-nowrap items-center justify-center px-2.5 sm:gap-5 lg:gap-8">
      <li v-for="link in links" :key="link.to">
        <RouterLink
          :to="link.to"
          active-class="text-gold!"
          class="nav-link block px-[7px] py-5 text-xs whitespace-nowrap text-mist transition-colors duration-[250ms] hover:text-paper sm:text-sm md:text-[15px] lg:font-medium"
        >
          {{ link.label }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
