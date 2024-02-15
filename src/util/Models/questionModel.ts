import { Schema, model } from "mongoose";

export interface IQuestionModel {
  id: string;
  type: string;
  question: string;
  translations: {
    de: string;
    es: string;
    fr: string;
  };
}

const questionModelSchema = new Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  question: { type: String, required: true },
  translations: {
    de: { type: String, required: false },
    es: { type: String, required: false },
    fr: { type: String, required: false },
    it: { type: String, required: false },
  },
});

export const questionModel = model<IQuestionModel>(
  "questionModel",
  questionModelSchema,
);
