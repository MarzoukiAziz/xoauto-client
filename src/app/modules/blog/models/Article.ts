export interface Article {
  _id: string;
  title: string;
  subtitle?: string;
  content?: string;
  previewImg: string;
  category?: string;
  readTime?: number;
  tags?: string;
  createdAt?: Date;
  updatedAt?: Date;
  views?: number;
  comments?: Comment[];
  commentCount?: number;
}
