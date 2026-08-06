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
  <article class="portfolio active" data-page="portfolio">
    <header>
      <h2 class="h2 article-title">项目作品</h2>
    </header>

    <section class="projects">
      <p class="section-lead">这里记录我已经上线、可以直接体验的真实项目。点击卡片将在新标签页打开。</p>
      <ul class="project-list featured-project-list">
        <li v-for="project in projects" :key="project.url" class="project-item active">
          <a :href="project.url" target="_blank" rel="noopener noreferrer">
            <figure class="project-img">
              <div class="project-item-icon-box"><ion-icon name="open-outline"></ion-icon></div>
              <img :src="project.cover" :alt="`${project.title} 首页截图`" width="1440" height="900" loading="lazy" />
            </figure>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-category">{{ project.category }}</p>
            <p class="project-description">{{ project.description }}</p>
          </a>
        </li>
      </ul>
    </section>
  </article>
</template>
