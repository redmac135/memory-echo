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

export type EmotionName =
  | "Admiration"
  | "Adoration"
  | "Aesthetic Appreciation"
  | "Amusement"
  | "Anger"
  | "Anxiety"
  | "Awe"
  | "Awkwardness"
  | "Boredom"
  | "Calmness"
  | "Concentration"
  | "Contemplation"
  | "Confusion"
  | "Contempt"
  | "Contentment"
  | "Craving"
  | "Determination"
  | "Disappointment"
  | "Disgust"
  | "Distress"
  | "Doubt"
  | "Ecstasy"
  | "Embarrassment"
  | "Empathic Pain"
  | "Entrancement"
  | "Envy"
  | "Excitement"
  | "Fear"
  | "Guilt"
  | "Horror"
  | "Interest"
  | "Joy"
  | "Love"
  | "Nostalgia"
  | "Pain"
  | "Pride"
  | "Realization"
  | "Relief"
  | "Romance"
  | "Sadness"
  | "Satisfaction"
  | "Desire"
  | "Shame"
  | "Surprise (negative)"
  | "Surprise (positive)"
  | "Sympathy"
  | "Tiredness"
  | "Triumph";

export type Emotions = {
  [key in EmotionName]: number;
};
