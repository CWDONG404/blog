import { createRouter, createWebHashHistory } from 'vue-router'
import AboutView from './views/AboutView.vue'
import BlogPostView from './views/BlogPostView.vue'
import BlogView from './views/BlogView.vue'
import NotFoundView from './views/NotFoundView.vue'
import PortfolioView from './views/PortfolioView.vue'
import ResumeView from './views/ResumeView.vue'
import StackView from './views/StackView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    { path: '/', name: 'about', component: AboutView, meta: { title: '关于' } },
    { path: '/resume', name: 'resume', component: ResumeView, meta: { title: '履历' } },
    { path: '/portfolio', name: 'portfolio', component: PortfolioView, meta: { title: '项目' } },
    { path: '/blog', name: 'blog', component: BlogView, meta: { title: '博客' } },
    { path: '/blog/:slug', name: 'blog-post', component: BlogPostView, meta: { title: '文章' } },
    { path: '/stack', name: 'stack', component: StackView, meta: { title: '技术栈' } },
    { path: '/contact', redirect: '/stack' },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { title: '页面未找到' } },
  ],
})

router.afterEach((to) => {
  const pageTitle = typeof to.meta.title === 'string' ? to.meta.title : '个人博客'
  document.title = `${pageTitle} · CWD`
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (description) {
    description.content = 'CWD 的个人博客，记录测试开发、安全工程、Python 全栈与 AI 应用开发实践。'
  }
})

export default router
