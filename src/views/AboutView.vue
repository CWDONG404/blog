<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const identities = ['重度 Vibe Coding 使用者', 'Windows 安全测试研究者', 'Python 全栈开发工程师']

const services = [
  {
    icon: 'shield-checkmark-outline',
    title: '安全与驱动测试',
    text: '关注安全产品、Windows 驱动、兼容性验证与可复现的问题定位链路。',
  },
  {
    icon: 'code-slash-outline',
    title: 'Python 全栈',
    text: '使用 Python、Django、Flask 与 Vue 构建自动化工具和 Web 应用。',
  },
  {
    icon: 'sparkles-outline',
    title: 'AI 应用开发',
    text: '实践本地模型、向量检索、RAG 服务与面向业务的 AI 工作流。',
  },
  {
    icon: 'server-outline',
    title: '信创适配',
    text: '在多种 Linux 发行版与虚拟化环境中开展兼容验证和故障分析。',
  },
]

const principles = ['快速验证', '工程落地', '持续迭代']

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
  <article class="surface-card panel-sizing animate-fade-in">
    <header class="about-heading">
      <h2
        class="article-title min-h-[1.45em] text-2xl text-paper sm:text-[32px]"
        aria-label="CWD：重度 Vibe Coding 使用者、Windows 安全测试研究者、Python 全栈开发工程师"
      >
        <span>{{ streamedIdentity }}</span><span class="typing-cursor" aria-hidden="true">|</span>
      </h2>
    </header>

    <section class="sm:mb-10">
      <p class="mb-4 px-2.5 text-justify text-sm leading-[1.6] font-light text-mist sm:text-[15px]">
        你好，我是 CWD，一名把测试思维、全栈开发和 AI 工具放进同一套工作流里的工程师。目前在 360安全能力中心 ·
        冰刃研究院从事安全产品、Windows 驱动测试与信创适配工作。
      </p>
      <p class="mb-4 px-2.5 text-justify text-sm leading-[1.6] font-light text-mist sm:text-[15px]">
        我习惯用 Python 搭建工程骨架，用 Vue 完成交互表达，也乐于通过 Vibe Coding
        快速验证想法。速度对我很重要，但可复现、可维护和真正解决问题同样重要。
      </p>
    </section>

    <section class="mb-9">
      <h3 class="mb-5 text-lg text-paper sm:text-2xl">我的方向</h3>
      <ul class="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-5">
        <li v-for="service in services" :key="service.title" class="gradient-card p-5 sm:flex sm:items-start sm:gap-[18px] sm:p-8">
          <div class="mb-2.5 sm:mt-1.5 sm:mb-0">
            <ion-icon :name="service.icon" class="mx-auto block text-[40px] text-gold [--ionicon-stroke-width:28px]"></ion-icon>
          </div>
          <div class="text-center sm:text-left">
            <h4 class="mb-[7px] text-base text-paper sm:text-lg">{{ service.title }}</h4>
            <p class="text-sm leading-[1.6] font-light text-mist sm:text-[15px]">{{ service.text }}</p>
          </div>
        </li>
      </ul>
    </section>

    <section class="mb-2.5">
      <h3 class="mb-5 text-lg text-paper sm:text-2xl">我的开发主张</h3>
      <div class="gradient-card grid cursor-default gap-3 p-[22px]">
        <p class="text-base leading-normal font-medium text-paper">把一个模糊想法，尽快变成真正可以使用的产品。</p>
        <p class="text-sm leading-[1.7] font-light text-mist sm:text-[15px]">
          我偏爱先用 Vibe Coding
          拉通交互与业务闭环，再用测试开发经验补齐边界、证据和质量。无论是安全工具、效率平台还是 AI
          应用，最终都应该经得住真实场景，而不只停留在一次漂亮的演示。
        </p>
        <ul class="mt-0.5 flex flex-wrap gap-2" aria-label="开发原则">
          <li
            v-for="principle in principles"
            :key="principle"
            class="rounded-full border border-gold/20 bg-gold/5 px-2.5 py-1.5 text-xs text-vegas-gold"
          >
            {{ principle }}
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>
