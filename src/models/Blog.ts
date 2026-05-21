import mongoose, { Schema, Document, models } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  excerpt: string;
  content: string;
  date: Date;
  createdAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: { type: String, default: '' },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Prevent model recompilation on hot-reload
const Blog = models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);

export default Blog;
