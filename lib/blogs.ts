export interface BlogMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags?: string[];
  featured?: boolean;
}

export function getAllBlogSlugs(): string[] {
  return [];
}

export function getAllBlogsMeta(): BlogMeta[] {
  return [];
}

export function getFeaturedBlogs(): BlogMeta[] {
  return [];
}
