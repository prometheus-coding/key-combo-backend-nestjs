import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema()
export class ScoreInfo {
  @ApiProperty({ example: 0, description: 'The score of the user', default: 0 })
  @Prop({ default: 0 })
  score: number;

  @ApiProperty({ example: 0, description: 'The combo duration in seconds', default: 0 })
  @Prop({ default: 0 })
  combo_duration_in_seconds: number;

  @ApiProperty({ example: 0, description: 'The total number of keys pressed', default: 0 })
  @Prop({ default: 0 })
  total_key_pressed: number;

  @ApiProperty({ example: new Date(), description: 'When the score was achieved' })
  @Prop({ default: Date.now })
  achieved_at: Date;
}

const ScoreInfoSchema = SchemaFactory.createForClass(ScoreInfo);

@Schema({ collection: 'User' })
export class User {
  @ApiProperty({ example: 'johndoe', description: 'The username of the user' })
  @Prop({ required: true })
  username: string;

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  @Prop({ required: true })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'The last name of the user' })
  @Prop({ required: true })
  last_name: string;

  @ApiProperty({ example: 'john@example.com', description: 'The email of the user' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  @Prop({ required: true })
  password: string;
  
  @ApiProperty()
  @Prop({ required: true })
  id_token: string;

  @ApiProperty({ type: [ScoreInfo], description: 'The score history of the user' })
  @Prop({ type: [ScoreInfoSchema], default: [] })
  scores: ScoreInfo[];

  @ApiProperty({ example: '2023-08-01T12:00:00Z', description: 'The creation date of the user' })
  @Prop({ default: Date.now })
  created_at: Date;

  
}

export const UserSchema = SchemaFactory.createForClass(User);