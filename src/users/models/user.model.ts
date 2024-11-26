import { Document, Schema, model, Model } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  password: string;
}


const UserSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel: Model<UserDocument> = model<UserDocument>('Users', UserSchema);
