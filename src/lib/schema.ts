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

export const EmotionData = {
  Admiration: 0,
  Adoration: 0,
  "Aesthetic Appreciation": 0,
  Amusement: 0,
  Anger: 0,
  Anxiety: 0,
  Awe: 0,
  Awkwardness: 0,
  Boredom: 0,
  Calmness: 0,
  Concentration: 0,
  Contemplation: 0,
  Confusion: 0,
  Contempt: 0,
  Contentment: 0,
  Craving: 0,
  Determination: 0,
  Disappointment: 0,
  Disgust: 0,
  Distress: 0,
  Doubt: 0,
  Ecstasy: 0,
  Embarrassment: 0,
  "Empathic Pain": 0,
  Entrancement: 0,
  Envy: 0,
  Excitement: 0,
  Fear: 0,
  Guilt: 0,
  Horror: 0,
  Interest: 0,
  Joy: 0,
  Love: 0,
  Nostalgia: 0,
  Pain: 0,
  Pride: 0,
  Realization: 0,
  Relief: 0,
  Romance: 0,
  Sadness: 0,
  Satisfaction: 0,
  Desire: 0,
  Shame: 0,
  "Surprise (negative)": 0,
  "Surprise (positive)": 0,
  Sympathy: 0,
  Tiredness: 0,
  Triumph: 0,
};
