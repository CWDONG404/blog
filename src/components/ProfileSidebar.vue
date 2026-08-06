<script setup lang="ts">
import { ref } from 'vue'
import avatarUrl from '../assets/avatar-luffy-pixel.webp'

const expanded = ref(false)
</script>

<template>
  <aside class="sidebar" :class="{ active: expanded }" data-sidebar>
    <div class="sidebar-info">
      <figure class="avatar-box">
        <img :src="avatarUrl" alt="路飞主题像素头像" width="80" height="80" />
      </figure>

      <div class="info-content">
        <h1 class="name" title="CWD">CWD</h1>
        <p class="title">高级测试开发工程师</p>
        <a class="profile-email" href="mailto:498567496@qq.com">498567496@qq.com</a>
      </div>

      <button class="info-more-btn" type="button" @click="expanded = !expanded">
        <span>{{ expanded ? '收起资料' : '展开资料' }}</span>
        <ion-icon :name="expanded ? 'chevron-up' : 'chevron-down'"></ion-icon>
      </button>
    </div>

    <div class="sidebar-info-more">
      <div class="separator"></div>

      <ul class="contacts-list">
        <li class="contact-item">
          <div class="icon-box"><ion-icon name="mail-outline"></ion-icon></div>
          <div class="contact-info">
            <p class="contact-title">邮箱</p>
            <a href="mailto:498567496@qq.com" class="contact-link">498567496@qq.com</a>
          </div>
        </li>
        <li class="contact-item">
          <div class="icon-box"><ion-icon name="business-outline"></ion-icon></div>
          <div class="contact-info">
            <p class="contact-title">当前任职</p>
            <p class="contact-link">360安全能力中心 · 冰刃研究院</p>
          </div>
        </li>
        <li class="contact-item">
          <div class="icon-box"><ion-icon name="location-outline"></ion-icon></div>
          <div class="contact-info">
            <p class="contact-title">所在地</p>
            <address>北京，中国</address>
          </div>
        </li>
        <li class="contact-item">
          <div class="icon-box"><ion-icon name="sparkles-outline"></ion-icon></div>
          <div class="contact-info">
            <p class="contact-title">发展方向</p>
            <p class="contact-link">AI 应用开发</p>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>
