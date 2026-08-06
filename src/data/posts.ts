export interface BlogPost {
  slug: string
  title: string
  summary: string
  date: string
  category: string
  cover: 'ai' | 'rag' | 'testing'
  fileName: string
  content: string
}

const markdownModules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const metadata: Array<Omit<BlogPost, 'content'>> = [
  {
    slug: 'test-development-to-ai-application',
    title: '从测试开发到 AI 应用开发：一条工程化成长路径',
    summary: '如何把测试开发中的自动化、问题定位和质量思维，迁移为 AI 应用开发的工程优势。',
    date: '2026-08-06',
    category: '职业成长',
    cover: 'ai',
    fileName: 'test-development-to-ai-application.md',
  },
  {
    slug: 'rag-web-service-on-limited-resources',
    title: '在有限资源下搭建 RAG Web 服务：从文档解析到检索问答',
    summary: '从最小闭环出发，拆解文档处理、向量检索、答案生成、评估和部署的关键决策。',
    date: '2026-08-06',
    category: 'AI 工程',
    cover: 'rag',
    fileName: 'rag-web-service-on-limited-resources.md',
  },
  {
    slug: 'driver-compatibility-testing-workflow',
    title: '驱动与安全产品兼容性测试：如何构建可复现的问题定位链路',
    summary: '从环境基线、证据采集到最小复现与回归矩阵，建立稳定、可沟通的兼容性测试方法。',
    date: '2026-08-06',
    category: '测试工程',
    cover: 'testing',
    fileName: 'driver-compatibility-testing-workflow.md',
  },
]

export const posts: BlogPost[] = metadata.map((post) => ({
  ...post,
  content: markdownModules[`../content/blog/${post.fileName}`] ?? '',
}))

export function findPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}
