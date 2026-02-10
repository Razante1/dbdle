import { useEffect, useState } from "react"
import { Personagem } from "../../interface/personagemProps"
import { InputProps } from "../../interface/InputProps"
import "../Search/search.css"

export function Search({ personagens, onSelect }: InputProps) {
  const [data, setData] = useState<Personagem[]>([])
  const [termo, setTermo] = useState('')

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
  }

  return (
    <div className="search-container">
      <input
        type="text"
        value={termo}
        onChange={handleChange}
        placeholder="Buscar personagem"
        className="search-input"
      />

      {data.length > 0 && (
        <ul className="search-list">
          {data.map(p => (
            <li
              key={p.name}
              className="search-item"
              onClick={() => {
                onSelect(p)
                setTermo('')
                setData([])
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

