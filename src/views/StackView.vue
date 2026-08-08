<script setup lang="ts">
const groups = [
  { title: 'Python / 后端', icon: 'logo-python', items: ['Python', 'Django', 'Flask', 'FastMCP', 'Node.js'] },
  { title: 'Vue / 前端', icon: 'code-slash-outline', items: ['Vue 2', 'Vue 3', 'Pinia', 'Vite', 'Arco Design Vue', 'Ant Design Vue'] },
  {
    title: 'AI 与检索',
    icon: 'sparkles-outline',
    items: ['Ollama', 'DeepSeek', 'Qwen', 'BGE-M3', 'SentenceTransformer', 'CLIP', 'FAISS', 'RAG'],
  },
  { title: '测试与安全', icon: 'shield-checkmark-outline', items: ['测试开发', 'Windows 驱动测试', '兼容性测试', '压力测试', '网络测试', '信创适配'] },
  { title: '数据与存储', icon: 'server-outline', items: ['MySQL', 'Redis', 'MongoDB', 'Elasticsearch', 'Pandas', 'NumPy', 'Scikit-learn', 'PyTorch'] },
  {
    title: 'Linux 与基础设施',
    icon: 'terminal-outline',
    items: ['Linux', 'Shell', 'Docker', 'Nginx', 'Git', 'QEMU', 'CentOS', 'UOS', 'Kylin', 'Ubuntu', 'OpenEuler'],
  },
]

const currentFocus = [
  { title: 'AI Application Development', text: '把模型能力包装成可维护、可评估的业务应用。' },
  { title: 'RAG Web 服务', text: '打通文档处理、向量检索、答案生成与部署链路。' },
  { title: 'AI Full Stack', text: '持续补齐前端体验、后端服务、模型调用与工程部署能力。' },
]
</script>

<template>
  <article class="surface-card panel-sizing animate-fade-in">
    <header>
      <h2 class="article-title mb-8 text-2xl text-paper sm:text-[32px]">技术栈</h2>
    </header>

    <section class="mb-6">
      <p class="px-2.5 text-justify text-sm leading-[1.6] font-light text-mist sm:text-[15px]">
        我的技术能力围绕“工程自动化、安全测试与 AI 应用落地”展开。下面列出实际使用或持续实践中的技术，不使用主观百分比衡量熟练度。
      </p>
    </section>

    <section class="mb-9 grid grid-cols-1 gap-5 md:grid-cols-2">
      <div v-for="group in groups" :key="group.title" class="gradient-card cursor-default p-[22px]">
        <div class="mb-[18px] flex items-center gap-3.5">
          <div class="icon-box icon-box--fixed"><ion-icon :name="group.icon"></ion-icon></div>
          <h3 class="text-base text-paper sm:text-lg">{{ group.title }}</h3>
        </div>
        <ul class="flex flex-wrap gap-[9px]">
          <li
            v-for="item in group.items"
            :key="item"
            class="rounded-lg border border-jet bg-onyx px-2.5 py-1.5 text-[13px] leading-[1.3] text-mist sm:text-[15px]"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </section>

    <section class="mb-2.5">
      <h3 class="mb-5 text-lg text-paper sm:text-2xl">当前重点</h3>
      <div class="gradient-card grid cursor-default gap-[18px] p-[22px]">
        <div v-for="focus in currentFocus" :key="focus.title" class="grid gap-1">
          <strong class="text-[15px] text-gold">{{ focus.title }}</strong>
          <span class="text-sm leading-[1.7] font-light text-mist sm:text-[15px]">{{ focus.text }}</span>
        </div>
      </div>
    </section>
  </article>
</template>
