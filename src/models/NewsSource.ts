import mongoose, { Schema, Document, models } from 'mongoose';

export interface INewsSource extends Document {
  url: string;
  name: string;
  is_active: boolean;
  createdAt: Date;
}

const NewsSourceSchema = new Schema<INewsSource>(
  {
    url: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    is_active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const NewsSource =
  models.NewsSource || mongoose.model<INewsSource>('NewsSource', NewsSourceSchema);

export default NewsSource;
