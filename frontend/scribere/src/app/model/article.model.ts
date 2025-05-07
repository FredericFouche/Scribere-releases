
/**
 * Represents an article with its essential properties.
 */
export interface Article {
  id: string;
  title: string;
  slug: string;
  coverImgUrl?: string;
  readTime?: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}
