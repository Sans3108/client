import { wyrModel, nhieModel, truthModel, dareModel, wwydModel } from '../Models/questionModel';
import {GuildlModel} from '../Models/guildModel'
interface LanguageMapType {
  en_EN: string;
  es_ES: string;
  de_DE: string;
  it_IT: string;
}

const langua cnm-geMap: LanguageMapType = {
  en_EN: 'en',
  es_ES: 'es',
  de_DE: 'de',
  it_IT: 'it',
};


export async function getQuestionsByType(type: string, language: string): Promise<string[]> {
  if (!languageMap[language]) {
    throw new Error(`Invalid language: ${language}`);
  }

  const normalizedLanguage = languageMap[language];

  const models = {
    wouldyourather: wyrModel,
    neverhaveiever: nhieModel,
    truth: truthModel,
    dare: dareModel,
    whatwouldyoudo: wwydModel,
  };

  const selectedModel = models[type.toLowerCase()];

  if (!selectedModel) {
    throw new Error(`Invalid question type: ${type}`);
  }

  try {
    const questions = await selectedModel.find().select(normalizedLanguage); 
    return questions.map((question: string) => question[normalizedLanguage]); 
  } catch (error) {
    console.error('Error fetching questions:', error);
    return []; 
  }
}
