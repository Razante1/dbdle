import { quizService } from "../service/quizService"
import { useState } from "react"
import { Personagem } from "../interface/personagemProps"

export function useQuiz() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [personagens, setPersonagens] = useState<Personagem[]>([])
  const [win, setWin] = useState<boolean>(false)
  const[personagemSelecionado , setPersonagemSelecionado]= useState<Personagem | null>(null)

  async function loadPersonagem() {
    try {
      setLoading(true)
      const data = await quizService.getAll()
      console.log(data);
      
      setPersonagens(data)
    } catch (error) {
      setError(true)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const getRandom = <T,>(arr: T[]): T | null => {
    if (arr.length === 0) return null
    return arr[Math.floor(Math.random() * arr.length)]
  }

  const sortear = () => {
    const selecionado = getRandom(personagens)
    setPersonagemSelecionado(selecionado)
    console.log(selecionado);
    
  }

  
  

  const validateWin =(personagem: Personagem) => {
    if(personagem.name === personagemSelecionado?.name){
      setWin(true)
    }return
  }


  return {
    loadPersonagem,
    loading,
    error,
    personagens,
    setPersonagens,
    win,
    sortear,
    validateWin,
    personagemSelecionado
  }
}
