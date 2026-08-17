<script setup lang="ts">
import ccnCover from '../assets/project-ccn.webp'
import planCover from '../assets/project-plan.webp'

const projects = [
  {
    title: 'CCN 技术赛事情报台',
    category: '技术机会索引',
    description: '聚合计算机比赛、黑客松与职业证书信息。',
    url: 'https://ccn.cwdzone.top/',
    cover: ccnCover,
  },
  {
    title: '2026 下半年成长路线图',
    category: '个人成长管理',
    description: '把长期目标拆解为领域、路线、里程碑与日常行动。',
    url: 'https://plan.cwdzone.top/',
    cover: planCover,
  },
]
</script>

<template>
  <article class="surface-card panel-sizing animate-fade-in">
    <header>
      <h2 class="article-title mb-8 text-2xl text-paper sm:text-[32px]">项目作品</h2>
    </header>

    <section>
      <p class="mx-[5px] -mt-[5px] mb-6 text-sm leading-[1.7] text-mist sm:text-[15px]">
        这里记录我已经上线、可以直接体验的真实项目。点击卡片将在新标签页打开。
      </p>
      <ul class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <li v-for="project in projects" :key="project.url" class="animate-scale-up">
          <a :href="project.url" target="_blank" rel="noopener noreferrer" class="project-card group block w-full">
            <figure class="project-visual relative mb-4 aspect-[8/5] w-full overflow-hidden rounded-2xl bg-eerie-1">
              <div class="absolute inset-0 z-[1] bg-black/0 transition-colors duration-[250ms] group-hover:bg-black/50"></div>
              <div
                class="absolute top-1/2 left-1/2 z-[2] flex -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-xl bg-jet p-[18px] text-xl text-gold opacity-0 transition-all duration-[250ms] group-hover:scale-100 group-hover:opacity-100"
              >
                <ion-icon name="open-outline" class="block [--ionicon-stroke-width:50px]"></ion-icon>
              </div>
              <img
                :src="project.cover"
                :alt="`${project.title} 首页截图`"
                width="1440"
                height="900"
                loading="lazy"
                class="h-full w-full object-contain"
              />
            </figure>
            <h3 class="ml-2.5 text-[15px] leading-[1.3] font-normal text-paper">{{ project.title }}</h3>
            <p class="ml-2.5 text-sm font-normal text-mist-70">{{ project.category }}</p>
            <p class="mx-2.5 mt-2 text-[13px] leading-[1.6] font-normal text-mist">{{ project.description }}</p>
          </a>
        </li>
      </ul>
    </section>
  </article>
</template>
