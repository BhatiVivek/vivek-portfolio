import mongoose, { Schema, Document, models } from 'mongoose';

export interface INewsArticle extends Document {
  url: string;
  title: string;
  summary: string;
  tag: string;
  source: string;
  published_at: Date;
  slot: 'morning' | 'evening';
  createdAt: Date;
}

const NewsArticleSchema = new Schema<INewsArticle>(
  {
    url: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    tag: { type: String, required: true },
    source: { type: String, required: true },
    published_at: { type: Date, default: Date.now },
    // "morning" = crawled at 6 AM run, "evening" = 6 PM run
    slot: { type: String, enum: ['morning', 'evening'], required: true },
  },
  { timestamps: true }
);

// Auto-delete articles older than 7 days
NewsArticleSchema.index({ published_at: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

const NewsArticle =
  models.NewsArticle || mongoose.model<INewsArticle>('NewsArticle', NewsArticleSchema);

export default NewsArticle;
