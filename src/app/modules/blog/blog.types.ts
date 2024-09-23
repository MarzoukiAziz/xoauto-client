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
export interface Comment {
  _id: string;
  uid: string;
  articleId: string;
  content: string;
  answerTo: string;
  createdAt?: Date;
  updatedAt?: Date;
  replies: Comment[];
}
