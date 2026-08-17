<script setup lang="ts">
import ProfileSidebar from './components/ProfileSidebar.vue'
import SiteNav from './components/SiteNav.vue'
</script>

<template>
  <div class="ambient-scene" aria-hidden="true">
    <span class="ambient-grid"></span>
    <span class="ambient-glow"></span>
    <span class="ambient-scan"></span>
  </div>

  <main
    class="page-main relative z-[1] mx-3 mt-4 mb-[72px] min-w-[259px] sm:mt-[60px] sm:mb-24 lg:mb-[60px] xl:mx-auto xl:flex xl:max-w-[1200px] xl:items-stretch xl:justify-center xl:gap-6"
  >
    <ProfileSidebar />

    <div class="main-content min-w-0 lg:relative lg:mx-auto lg:w-max xl:m-0 xl:w-3/4 xl:min-w-[75%]">
      <SiteNav />
      <RouterView />
    </div>
  </main>
</template>
