<script setup lang="ts">
const groups = [
  { title: 'Python / 后端', icon: 'logo-python', items: ['Python', 'Django', 'Flask', 'FastMCP', 'Node.js'] },
  { title: 'Vue / 前端', icon: 'code-slash-outline', items: ['Vue 2', 'Vue 3', 'Pinia', 'Vite', 'Arco Design Vue', 'Ant Design Vue'] },
  { title: 'AI 与检索', icon: 'sparkles-outline', items: ['Ollama', 'DeepSeek', 'Qwen', 'BGE-M3', 'SentenceTransformer', 'CLIP', 'FAISS', 'RAG'] },
  { title: '测试与安全', icon: 'shield-checkmark-outline', items: ['测试开发', 'Windows 驱动测试', '兼容性测试', '压力测试', '网络测试', '信创适配'] },
  { title: '数据与存储', icon: 'server-outline', items: ['MySQL', 'Redis', 'MongoDB', 'Elasticsearch', 'Pandas', 'NumPy', 'Scikit-learn', 'PyTorch'] },
  { title: 'Linux 与基础设施', icon: 'terminal-outline', items: ['Linux', 'Shell', 'Docker', 'Nginx', 'Git', 'QEMU', 'CentOS', 'UOS', 'Kylin', 'Ubuntu', 'OpenEuler'] },
]
</script>

<template>
  <article class="stack active" data-page="stack">
    <header>
      <h2 class="h2 article-title">技术栈</h2>
    </header>

    <section class="stack-intro about-text">
      <p>我的技术能力围绕“工程自动化、安全测试与 AI 应用落地”展开。下面列出实际使用或持续实践中的技术，不使用主观百分比衡量熟练度。</p>
    </section>

    <section class="stack-grid">
      <div v-for="group in groups" :key="group.title" class="content-card stack-card">
        <div class="stack-card-title">
          <div class="icon-box"><ion-icon :name="group.icon"></ion-icon></div>
          <h3 class="h4">{{ group.title }}</h3>
        </div>
        <ul class="tag-list">
          <li v-for="item in group.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </section>

    <section class="current-focus">
      <h3 class="h3">当前重点</h3>
      <div class="content-card current-focus-card">
        <div><strong>AI Application Development</strong><span>把模型能力包装成可维护、可评估的业务应用。</span></div>
        <div><strong>RAG Web 服务</strong><span>打通文档处理、向量检索、答案生成与部署链路。</span></div>
        <div><strong>AI Full Stack</strong><span>持续补齐前端体验、后端服务、模型调用与工程部署能力。</span></div>
      </div>
    </section>
  </article>
</template>
