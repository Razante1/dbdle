import { useEffect, useState,useRef } from "react"
import { useQuiz } from "../composables/useQuiz"
import { Search } from "../components/Search/Search"
import { Choices } from "../components/Choices/choices"
import { Personagem } from "../interface/personagemProps"
  
export const Quiz = () => {
    const { loadPersonagem, personagens, setPersonagens, loading, win, sortear,validateWin,personagemSelecionado } = useQuiz()
    const jaSorteou = useRef(false)
    const [choices, setChoices] = useState<Personagem[]>([])

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
        validateWin(personagem)
        setChoices(prev => [personagem,...prev])
        setPersonagens(prev => prev.filter(p => p.name !== personagem.name))
    }

    if (loading) return (
        <div className="quiz-page-wrapper">
            <p>Carregando personagens...</p>
        </div>
    )

    return (
        <div className="quiz-page-wrapper"> 
            
            {!win? <div className="container">
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Dragon Ball Quiz</h2>
                
                <Search personagens={personagens} onSelect={handleSelect} />
                <Choices choices={choices} personagem={personagemSelecionado} />
                

            </div> : <p style={{ color: 'green', fontWeight: 'bold' }}>Você venceu!</p>}
        </div>
    )
}