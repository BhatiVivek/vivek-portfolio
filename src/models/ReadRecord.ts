import mongoose, { Schema, Document, models } from 'mongoose';

export interface IReadRecord extends Document {
  ipHash: string;
  articleId: mongoose.Types.ObjectId;
  readAt: Date;
}

const ReadRecordSchema = new Schema<IReadRecord>({
  ipHash:    { type: String, required: true },
  articleId: { type: Schema.Types.ObjectId, ref: 'NewsArticle', required: true },
  readAt:    { type: Date, default: Date.now },
});

// One record per (ip, article) pair — prevents duplicate inserts
ReadRecordSchema.index({ ipHash: 1, articleId: 1 }, { unique: true });

// Auto-delete read records after 7 days (matches NewsArticle TTL)
ReadRecordSchema.index({ readAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 });

const ReadRecord =
  models.ReadRecord || mongoose.model<IReadRecord>('ReadRecord', ReadRecordSchema);

export default ReadRecord;
