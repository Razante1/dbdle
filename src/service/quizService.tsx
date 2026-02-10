import api from "./api"

export const quizService = {
  async getAll() {
    const response = await api.get(
      "https://dragonball-api.com/api/characters?page=1&limit=10"
    )
    return response.data.items;
  }
}
