<script setup lang="ts">
const workExperience = [
  {
    title: '360安全能力中心 · 冰刃研究院',
    period: '2024.07 — 至今',
    text: '现任高级测试开发工程师。从 Python 开发实践逐步转向驱动测试团队，参与安全产品与政企场景的驱动测试、兼容性验证、信创适配和测试工具建设，持续通过自动化提高问题复现与回归效率。',
  },
  {
    title: '测试开发与 AI 应用探索',
    period: '持续进行',
    text: '把 AI 引入脚本维护、压力测试、网络测试方案与用户反馈分析流程，同时探索文档解析、向量检索和本地模型驱动的 RAG Web 服务。',
  },
]

const education = [
  {
    title: '湖北工业大学 · 计算机技术硕士',
    text: '围绕计算机技术、软件工程与工程实践建立系统化知识基础。',
  },
  {
    title: '网络工程本科',
    text: '学习计算机网络、操作系统、程序设计与网络工程相关基础。',
  },
]

const careerPath = ['测试开发', 'AI Application Development', 'AI Full Stack']
</script>

<template>
  <article class="surface-card panel-sizing animate-fade-in">
    <header>
      <h2 class="article-title mb-8 text-2xl text-paper sm:text-[32px]">个人履历</h2>
    </header>

    <section class="mb-8">
      <div class="mb-6 flex items-center gap-4">
        <div class="icon-box"><ion-icon name="briefcase-outline"></ion-icon></div>
        <h3 class="text-lg text-paper sm:text-2xl">工作经历</h3>
      </div>
      <ol class="timeline-list">
        <li v-for="item in workExperience" :key="item.title" class="timeline-item">
          <h4 class="mb-[7px] text-sm leading-[1.3] text-paper sm:text-[15px]">{{ item.title }}</h4>
          <span class="leading-[1.6] text-vegas-gold">{{ item.period }}</span>
          <p class="text-justify leading-[1.6] font-light text-mist xl:max-w-[700px]">{{ item.text }}</p>
        </li>
      </ol>
    </section>

    <section class="mb-8">
      <div class="mb-6 flex items-center gap-4">
        <div class="icon-box"><ion-icon name="school-outline"></ion-icon></div>
        <h3 class="text-lg text-paper sm:text-2xl">教育背景</h3>
      </div>
      <ol class="timeline-list">
        <li v-for="item in education" :key="item.title" class="timeline-item">
          <h4 class="mb-[7px] text-sm leading-[1.3] text-paper sm:text-[15px]">{{ item.title }}</h4>
          <p class="text-justify leading-[1.6] font-light text-mist xl:max-w-[700px]">{{ item.text }}</p>
        </li>
      </ol>
    </section>

    <section class="mb-2.5">
      <h3 class="mb-5 text-lg text-paper sm:text-2xl">职业方向</h3>
      <div class="gradient-card flex cursor-default flex-wrap items-center gap-2.5 p-[22px] text-sm font-light text-mist sm:text-[15px]">
        <template v-for="(stage, index) in careerPath" :key="stage">
          <ion-icon v-if="index > 0" name="arrow-forward-outline" class="text-gold"></ion-icon>
          <span>{{ stage }}</span>
        </template>
      </div>
    </section>
  </article>
</template>
