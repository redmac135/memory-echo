export type Entry = {
  id: string;
  caption: string;
  userId: string;
  mediaId: string;
  createdAt: Date;
};

export type StringEntry = Entry & { createdAt: string };

export type ExtendedEntry = Entry & {
  media: { id: string; publicId: string; isVideo: boolean };
};

export type Emotion = {
  name: string;
  score: number;
};

export type Media = {
  id: string;
  publicId: string;
  isVideo: boolean;
};
