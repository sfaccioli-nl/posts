export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type Action = {
  postId: number;
  from: number;
  to: number;
  snapshot: Post[];
};
