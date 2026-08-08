export interface BlogPost {
  slug: string
  title: string
  summary: string
  date: string
  category: string
  cover: 'ai' | 'rag' | 'testing'
  order: number
  content: string
}

const markdownModules = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

/**
 * 轻量 frontmatter 解析：md 文件是唯一信息源。
 * 支持 `key: value` 行（值可包含中文与全角冒号），正文为 --- 之后的内容。
 */
function parsePost(filePath: string, raw: string): BlogPost {
  const meta: Record<string, string> = {}
  let body = raw

  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (frontmatter) {
    body = frontmatter[2]
    for (const line of frontmatter[1].split(/\r?\n/)) {
      const pair = line.match(/^([A-Za-z_]+):\s*(.+)$/)
      if (pair) meta[pair[1]] = pair[2].trim()
    }
  }

  const fileSlug = filePath.split('/').pop()?.replace(/\.md$/, '') ?? ''

  return {
    slug: meta.slug || fileSlug,
    title: meta.title ?? '未命名文章',
    summary: meta.summary ?? '',
    date: meta.date ?? '1970-01-01',
    category: meta.category ?? '未分类',
    cover: (meta.cover as BlogPost['cover']) ?? 'ai',
    order: Number.parseInt(meta.order ?? '99', 10),
    content: body.trim(),
  }
}

/** 按日期倒序；日期相同时按 frontmatter 中的 order 升序 */
export const posts: BlogPost[] = Object.entries(markdownModules)
  .map(([path, raw]) => parsePost(path, raw))
  .sort((a, b) => (a.date === b.date ? a.order - b.order : b.date.localeCompare(a.date)))

export function findPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug)
}
