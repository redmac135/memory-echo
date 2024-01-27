export type Entry = {
  id: string;
  caption: string;
  userId: string;
  mediaId: string;
  createdAt: Date;
};

export type Emotion = {
  name: string;
  score: number;
};
