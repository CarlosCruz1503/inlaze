import { Document, Schema, model, Model } from 'mongoose';

export interface MovieDocument extends Document {
  idMovie: string;
  title: string;
  photo: string;
  userId: Schema.Types.ObjectId;
}


export const MovieSchema = new Schema<MovieDocument>({
  idMovie: { type: String, required: true },
  title: { type: String, required: true },
  photo: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'Movies' },
});


export const MovieModel: Model<MovieDocument> = model<MovieDocument>('Movies', MovieSchema);
