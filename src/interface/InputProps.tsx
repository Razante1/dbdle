import { Personagem } from "./personagemProps"

export interface InputProps {
  personagens: Personagem[]
  onSelect:(personagem: Personagem) => void
}