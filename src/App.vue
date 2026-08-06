<script setup lang="ts">
import ProfileSidebar from './components/ProfileSidebar.vue'
import SiteNav from './components/SiteNav.vue'
</script>

<template>
  <main>
    <ProfileSidebar />

    <div class="main-content">
      <SiteNav />
      <RouterView />
    </div>
  </main>
</template>
