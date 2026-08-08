<template>
  <article class="surface-card panel-sizing animate-fade-in">
    <div class="flex min-h-[430px] flex-col items-center justify-center gap-3.5 text-center text-mist">
      <ion-icon name="compass-outline" class="text-[58px] text-gold"></ion-icon>
      <p class="tracking-[2px] text-vegas-gold">404</p>
      <h2 class="text-2xl text-paper sm:text-[32px]">页面未找到</h2>
      <p>这个地址不存在，或者内容已经移动。</p>
      <RouterLink class="primary-link" to="/">返回首页</RouterLink>
    </div>
  </article>
</template>
