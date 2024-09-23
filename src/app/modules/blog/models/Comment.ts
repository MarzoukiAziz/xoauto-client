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
