import { createRouter, createWebHashHistory } from 'vue-router'

const AboutView = () => import('./views/AboutView.vue')
const ResumeView = () => import('./views/ResumeView.vue')
const PortfolioView = () => import('./views/PortfolioView.vue')
const BlogView = () => import('./views/BlogView.vue')
const BlogPostView = () => import('./views/BlogPostView.vue')
const StackView = () => import('./views/StackView.vue')
const NotFoundView = () => import('./views/NotFoundView.vue')

const DEFAULT_DESCRIPTION = 'CWD 的个人博客，记录测试开发、安全工程、Python 全栈与 AI 应用开发实践。'

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      name: 'about',
      component: AboutView,
      meta: { title: '关于', description: 'CWD：高级测试开发工程师，正在走向 AI 应用开发的工程化成长路径。' },
    },
    {
      path: '/resume',
      name: 'resume',
      component: ResumeView,
      meta: { title: '履历', description: 'CWD 的工作经历、教育背景与职业方向。' },
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioView,
      meta: { title: '项目', description: 'CWD 已上线、可以直接体验的真实项目作品。' },
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView,
      meta: { title: '博客', description: '测试工程、AI 工程与职业成长方向的中文技术文章。' },
    },
    {
      path: '/blog/:slug',
      name: 'blog-post',
      component: BlogPostView,
      meta: { title: '文章', description: DEFAULT_DESCRIPTION },
    },
    {
      path: '/stack',
      name: 'stack',
      component: StackView,
      meta: { title: '技术栈', description: 'CWD 实际使用或持续实践中的分组技术栈与当前重点。' },
    },
    { path: '/contact', redirect: '/stack' },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: '页面未找到', description: DEFAULT_DESCRIPTION },
    },
  ],
})

router.afterEach((to) => {
  const pageTitle = typeof to.meta.title === 'string' ? to.meta.title : '个人博客'
  document.title = `${pageTitle} · CWD`
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (description) {
    description.content = typeof to.meta.description === 'string' ? to.meta.description : DEFAULT_DESCRIPTION
  }
})

export default router
