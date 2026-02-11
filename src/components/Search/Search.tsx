import { useEffect, useState } from "react"
import { Personagem } from "../../interface/personagemProps"
import { InputProps } from "../../interface/InputProps"
import "../Search/search.css"

export function Search({ personagens, onSelect }: InputProps) {
  const [data, setData] = useState<Personagem[]>([])
  const [termo, setTermo] = useState('')

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setData(personagens)
  }, [personagens])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTermo(value)

    const filtrados = personagens.filter(p =>
      p.name.toLowerCase().includes(value.toLowerCase())
    )

    setData(filtrados)
    setIsOpen(true) 
  }

  const handleOpenOptions = () => {
    setIsOpen(true)
  }

  return (
    <div className="search-container">
      <input
        type="text"
        value={termo}
        onChange={handleChange}
        onClick={handleOpenOptions}
        placeholder="Buscar personagem"
        className="search-input"
        // 3. Fecha a lista se o usuário clicar fora (opcional, mas bom UX)
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      />

      {/* 4. Verificamos isOpen E se há dados */}
      {isOpen && data.length > 0 && (
        <ul className="search-list">
          {data.map(p => (
            <li
              key={p.name}
              className="search-item"
              onClick={() => {
                onSelect(p)
                setTermo("") 
                setIsOpen(false) // Fecha a lista
              }}
            >
              {p.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}