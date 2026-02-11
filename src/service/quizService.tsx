import api from "./api"
import { Personagem } from "../interface/personagemProps"
import { PersonagemModel } from "../model/personagemModel";

export const quizService = {
  async getAll(): Promise<Personagem[]> {
    const response = await api.get<{ items: any[] }>(
      "https://dragonball-api.com/api/characters?page=1&limit=10"
    );
      return response.data.items.map(item => new PersonagemModel(item));
  }
}