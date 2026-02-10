import { useEffect, useState,useRef } from "react"
import { useQuiz } from "../composables/useQuiz"
import { Search } from "../components/Search/Search"
import { Choices } from "../components/Choices/choices"
import { Personagem } from "../interface/personagemProps"
  
export const Quiz = () => {
    const { loadPersonagem, personagens,setPersonagens, loading,win,sortear } = useQuiz()
    const jaSorteou = useRef(false)
    const[choices,setChoices] = useState<Personagem[]>([])

    useEffect(() => {
        loadPersonagem();
    }, [])


    useEffect(() => {
    if (personagens.length > 0 && !jaSorteou.current) {
        sortear()
        jaSorteou.current = true
    }
    }, [personagens])

    const handleSelect = (personagem: Personagem) => {
        setChoices(prev => [...prev, personagem])
        setPersonagens(prev =>
            prev.filter(p => p.name !== personagem.name)
    )
  }

    if (loading) return <p>Carregando...</p>

    return (
        
        <div className="container">
            <Search personagens={personagens}  onSelect={handleSelect}/>
            <Choices choices={choices}/>
        </div>
    )
}
