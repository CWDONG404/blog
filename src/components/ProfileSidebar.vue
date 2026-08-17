<script setup lang="ts">
import { ref } from 'vue'
import avatarUrl from '../assets/avatar-cwd-ruby.webp'

const expanded = ref(false)

const contacts = [
  { icon: 'mail-outline', label: '邮箱', value: '498567496@qq.com', href: 'mailto:498567496@qq.com', isAddress: false },
  { icon: 'business-outline', label: '当前任职', value: '360安全能力中心 · 冰刃研究院', href: '', isAddress: false },
  { icon: 'location-outline', label: '所在地', value: '北京，中国', href: '', isAddress: true },
  { icon: 'sparkles-outline', label: '发展方向', value: 'AI 应用开发', href: '', isAddress: false },
]
</script>

<template>
  <aside class="surface-card panel-sizing profile-sidebar mb-4 sm:mb-8" :class="{ expanded }">
    <div class="relative flex items-center gap-4 sm:gap-6 xl:flex-col">
      <figure class="profile-avatar shrink-0 overflow-hidden">
        <img
          :src="avatarUrl"
          alt="CWD 暗黑插画风格头像"
          width="512"
          height="512"
          decoding="async"
          fetchpriority="high"
          class="block h-full w-full object-cover object-center"
        />
      </figure>

      <div class="min-w-0">
        <h1
          class="profile-name mb-2.5 text-[17px] font-medium tracking-[-0.25px] text-paper sm:mb-4 sm:text-[26px] xl:text-center xl:whitespace-nowrap"
          title="CWD"
        >
          CWD
        </h1>
        <p class="profile-role w-max rounded-lg bg-onyx px-3 py-[3px] text-xs font-normal text-white sm:px-2.5 sm:py-[5px] xl:mx-auto">
          高级测试开发工程师
        </p>
        <a class="profile-email" href="mailto:498567496@qq.com">498567496@qq.com</a>
      </div>

      <button
        type="button"
        class="corner-btn inline-flex items-center justify-center gap-1 xl:hidden"
        :aria-label="expanded ? '收起个人资料' : '展开个人资料'"
        :aria-expanded="expanded"
        aria-controls="profile-details"
        @click="expanded = !expanded"
      >
        <span class="hidden text-xs sm:block">{{ expanded ? '收起资料' : '展开资料' }}</span>
        <ion-icon class="sm:hidden" :name="expanded ? 'chevron-up' : 'chevron-down'"></ion-icon>
      </button>
    </div>

    <div id="profile-details" class="sidebar-info-more">
      <div class="my-4 h-px w-full bg-jet sm:my-8"></div>

      <ul class="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-x-4 md:gap-y-8 xl:grid-cols-1">
        <li v-for="contact in contacts" :key="contact.label" class="flex min-w-full items-center gap-4">
          <div class="icon-box shrink-0"><ion-icon :name="contact.icon"></ion-icon></div>
          <div class="w-[calc(100%-46px)] max-w-[calc(100%-46px)] sm:w-[calc(100%-64px)] sm:max-w-[calc(100%-64px)]">
            <p class="mb-0.5 text-xs uppercase text-mist-70">{{ contact.label }}</p>
            <a
              v-if="contact.href"
              :href="contact.href"
              class="block break-all text-[13px] text-paper transition-colors duration-[250ms] hover:text-gold sm:text-[15px] xl:text-sm xl:font-normal"
              >{{ contact.value }}</a
            >
            <address v-else-if="contact.isAddress" class="text-[13px] break-words text-paper not-italic sm:text-[15px] xl:text-sm xl:font-normal">{{
              contact.value
            }}</address>
            <p v-else class="text-[13px] break-words text-paper sm:text-[15px] xl:text-sm xl:font-normal">{{ contact.value }}</p>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>
