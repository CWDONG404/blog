import '@fontsource/poppins/latin-300.css'
import '@fontsource/poppins/latin-400.css'
import '@fontsource/poppins/latin-500.css'
import '@fontsource/poppins/latin-600.css'
import { addIcons } from 'ionicons'
import { defineCustomElement } from 'ionicons/components/ion-icon.js'
import {
  arrowBackOutline,
  arrowForwardOutline,
  briefcaseOutline,
  businessOutline,
  chevronDown,
  chevronUp,
  codeSlashOutline,
  compassOutline,
  copyOutline,
  documentTextOutline,
  gitNetworkOutline,
  listOutline,
  locationOutline,
  logoPython,
  mailOutline,
  openOutline,
  schoolOutline,
  serverOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
  terminalOutline,
} from 'ionicons/icons'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// 按需注册图标与自定义元素，替代 unpkg CDN 全量加载
defineCustomElement()
addIcons({
  'arrow-back-outline': arrowBackOutline,
  'arrow-forward-outline': arrowForwardOutline,
  'briefcase-outline': briefcaseOutline,
  'business-outline': businessOutline,
  'chevron-down': chevronDown,
  'chevron-up': chevronUp,
  'code-slash-outline': codeSlashOutline,
  'compass-outline': compassOutline,
  'copy-outline': copyOutline,
  'document-text-outline': documentTextOutline,
  'git-network-outline': gitNetworkOutline,
  'list-outline': listOutline,
  'location-outline': locationOutline,
  'logo-python': logoPython,
  'mail-outline': mailOutline,
  'open-outline': openOutline,
  'school-outline': schoolOutline,
  'server-outline': serverOutline,
  'shield-checkmark-outline': shieldCheckmarkOutline,
  'sparkles-outline': sparklesOutline,
  'terminal-outline': terminalOutline,
})

createApp(App).use(router).mount('#app')
