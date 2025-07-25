import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  phone!: string;

  @Prop({ unique: true, required: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  confirmPassword!: string;

  @Prop({ type: String, enum: ['user', 'admin'], default: 'user' })
  role!: string;

  @Prop({ required: true, default: true })
  isActive!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
