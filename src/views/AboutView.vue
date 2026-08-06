<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const identities = [
  '重度 Vibe Coding 使用者',
  'Windows 安全测试研究者',
  'Python 全栈开发工程师',
]

const streamedIdentity = ref('')
let typingTimer: number | undefined
let identityIndex = 0
let characterIndex = 0
let deleting = false

function typeNextCharacter() {
  const identity = identities[identityIndex]

  if (!deleting) {
    characterIndex += 1
    streamedIdentity.value = identity.slice(0, characterIndex)

    if (characterIndex === identity.length) {
      deleting = true
      typingTimer = window.setTimeout(typeNextCharacter, 1600)
      return
    }
  } else {
    characterIndex -= 1
    streamedIdentity.value = identity.slice(0, characterIndex)

    if (characterIndex === 0) {
      deleting = false
      identityIndex = (identityIndex + 1) % identities.length
    }
  }

  typingTimer = window.setTimeout(typeNextCharacter, deleting ? 36 : 72)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    streamedIdentity.value = identities[0]
    return
  }

  typeNextCharacter()
})

onBeforeUnmount(() => window.clearTimeout(typingTimer))
</script>

<template>
  <article class="about active" data-page="about">
    <header>
      <h2
        class="h2 article-title streaming-title"
        aria-label="CWD：重度 Vibe Coding 使用者、Windows 安全测试研究者、Python 全栈开发工程师"
      >
        <span>{{ streamedIdentity }}</span><span class="typing-cursor" aria-hidden="true">|</span>
      </h2>
    </header>

    <section class="about-text">
      <p>你好，我是 CWD，一名把测试思维、全栈开发和 AI 工具放进同一套工作流里的工程师。目前在 360安全能力中心 · 冰刃研究院从事安全产品、Windows 驱动测试与信创适配工作。</p>
      <p>我习惯用 Python 搭建工程骨架，用 Vue 完成交互表达，也乐于通过 Vibe Coding 快速验证想法。速度对我很重要，但可复现、可维护和真正解决问题同样重要。</p>
    </section>

    <section class="service">
      <h3 class="h3 service-title">我的方向</h3>
      <ul class="service-list">
        <li class="service-item">
          <div class="service-icon-box"><ion-icon name="shield-checkmark-outline"></ion-icon></div>
          <div class="service-content-box">
            <h4 class="h4 service-item-title">安全与驱动测试</h4>
            <p class="service-item-text">关注安全产品、Windows 驱动、兼容性验证与可复现的问题定位链路。</p>
          </div>
        </li>
        <li class="service-item">
          <div class="service-icon-box"><ion-icon name="code-slash-outline"></ion-icon></div>
          <div class="service-content-box">
            <h4 class="h4 service-item-title">Python 全栈</h4>
            <p class="service-item-text">使用 Python、Django、Flask 与 Vue 构建自动化工具和 Web 应用。</p>
          </div>
        </li>
        <li class="service-item">
          <div class="service-icon-box"><ion-icon name="sparkles-outline"></ion-icon></div>
          <div class="service-content-box">
            <h4 class="h4 service-item-title">AI 应用开发</h4>
            <p class="service-item-text">实践本地模型、向量检索、RAG 服务与面向业务的 AI 工作流。</p>
          </div>
        </li>
        <li class="service-item">
          <div class="service-icon-box"><ion-icon name="server-outline"></ion-icon></div>
          <div class="service-content-box">
            <h4 class="h4 service-item-title">信创适配</h4>
            <p class="service-item-text">在多种 Linux 发行版与虚拟化环境中开展兼容验证和故障分析。</p>
          </div>
        </li>
      </ul>
    </section>

    <section class="focus-section">
      <h3 class="h3">我的开发主张</h3>
      <div class="content-card focus-card">
        <p class="focus-kicker">把一个模糊想法，尽快变成真正可以使用的产品。</p>
        <p>我偏爱先用 Vibe Coding 拉通交互与业务闭环，再用测试开发经验补齐边界、证据和质量。无论是安全工具、效率平台还是 AI 应用，最终都应该经得住真实场景，而不只停留在一次漂亮的演示。</p>
        <ul class="focus-principles" aria-label="开发原则">
          <li>快速验证</li>
          <li>工程落地</li>
          <li>持续迭代</li>
        </ul>
      </div>
    </section>
  </article>
</template>
