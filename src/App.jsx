import React, { useEffect, useState } from "react";
import './App.css';

const personagem1 = {
  nome: "Goku",
  raca: "Saiyajin",
  arcoDeAparicao: "Saga dos Saiyajins",
  nivelDePoder: "Ultra Instinct",
  planetaNatal: "Planeta Vegeta"
};

const personagem2 = {
  nome: "Vegeta",
  raca: "Saiyajin",
  arcoDeAparicao: "Saga de Freeza",
  nivelDePoder: "Super Saiyajin Blue",
  planetaNatal: "Planeta Vegeta"
};

const personagem3 = {
  nome: "Gohan",
  raca: "Híbrido (Humano/Saiyajin)",
  arcoDeAparicao: "Saga de Cell",
  nivelDePoder: "Gohan Místico",
  planetaNatal: "Terra"
};

const personagem4 = {
  nome: "Piccolo",
  raca: "Namekuseijin",
  arcoDeAparicao: "Saga do Piccolo Daimaoh",
  nivelDePoder: "Orange Piccolo",
  planetaNatal: "Namekusei"
};

const personagem5 = {
  nome: "Trunks (do Futuro)",
  raca: "Híbrido (Humano/Saiyajin)",
  arcoDeAparicao: "Saga dos Androides",
  nivelDePoder: "Super Saiyajin Rage",
  planetaNatal: "Terra (Linha do tempo alternativa)"
};

const personagem6 = {
  nome: "Bulma",
  raca: "Humana",
  arcoDeAparicao: "Saga de Pilaf",
  nivelDePoder: "Gênio da tecnologia",
  planetaNatal: "Terra"
};

const personagem7 = {
  nome: "Freeza",
  raca: "Desconhecida (raça do Freeza)",
  arcoDeAparicao: "Saga de Namekusei",
  nivelDePoder: "Golden Freeza",
  planetaNatal: "Desconhecido"
};

const personagem8 = {
  nome: "Majin Boo",
  raca: "Majin",
  arcoDeAparicao: "Saga de Majin Boo",
  nivelDePoder: "Kid Boo",
  planetaNatal: "Desconhecido"
};

const personagem9 = {
  nome: "Beerus",
  raca: "Deus da Destruição",
  arcoDeAparicao: "Saga do Deus da Destruição",
  nivelDePoder: "Nível Divino",
  planetaNatal: "Planeta do Beerus"
};

const personagem10 = {
  nome: "Android 18",
  raca: "Androide (Humana modificada)",
  arcoDeAparicao: "Saga dos Androides",
  nivelDePoder: "Super Androide",
  planetaNatal: "Terra"
};

const personagens = [
  personagem1, personagem2, personagem3, personagem4, personagem5,
  personagem6, personagem7, personagem8, personagem9, personagem10
];


const sortearPersonagem = () => {
  const aleatorio = personagens[Math.floor(Math.random() * personagens.length)];
  return (aleatorio);
};
// Exemplo de seleção:
const personagemDaVez = sortearPersonagem(); // Vegeta
console.log(personagemDaVez)


function App() {
  const [escolhaPersonagem, setEscolhaPersonagem] = useState('');
  const [personagem, setPersonagem] = useState('');
  const [escolhas,setEscolhas] = useState(personagens);

  const [venceu , setVenceu] = useState(false)

  const [personagemEscolhido, setPersonagemEscolhido] = useState('');
  const [listaDePersonagens, setListaDePersonagens] = useState([]);

  // Controle para mostrar/ocultar lista de sugestões
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);



  // Filtra sugestões com base no input atual
  const sugestoesFiltradas = escolhas.filter(p =>
    p.nome.toLowerCase().includes(personagem.toLowerCase()) && personagem !== ''
  );


    const verificaCampo = (pessoa, chave) => {
      return pessoa[chave] === personagemDaVez[chave] ? "green" : "red";
    };

    const goTo = (id) => {
      if(venceu) {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }  
      }
    }


  const enviarEscolha = (nome) => {
    setEscolhaPersonagem(nome);
    const resultado = escolhas.find(p => p.nome === nome);
    if (resultado) {
      setPersonagemEscolhido(resultado);
      if(resultado === personagemDaVez ) {
        setVenceu(true)
      }
    } else {
      setPersonagemEscolhido({ nome: "personagem não encontrado!" });
    }
    setPersonagem("");
    setMostrarSugestoes(false);
  };

  const handleChange = (e) => {
    setPersonagem(e.target.value);
    setMostrarSugestoes(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && personagem.trim() !== '') {
      enviarEscolha(personagem);
      goTo("venceu")
    }
  };

  useEffect(() => {
    if (
      personagemEscolhido &&
      personagemEscolhido.nome !== "personagem não encontrado!"
    ) {
      setListaDePersonagens(prev => {
        if (prev.some(p => p.nome === personagemEscolhido.nome)) return prev;
        return [personagemEscolhido, ...prev];
      });
      setEscolhas((prev) => prev.filter((i) => i !== personagemEscolhido))
    }
  }, [personagemEscolhido]);

  return (
    <div style={{
        position: "relative",
        bottom: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        maxWidth: "500px",
        height: "40vh", // altura total da tela
        margin: "auto",
        padding: "20px",
        boxSizing: "border-box",
      }}>
        {/* Parte fixa do topo */}
        <div style={{ width: "100%", marginBottom: "10px" }}>

          {!venceu && (
            <input
              value={personagem}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Digite ou selecione"
              style={{ width: "100%", padding: "8px", fontSize: "16px", marginTop: "10px" }}
              onFocus={() => setMostrarSugestoes(true)}
              onBlur={() => setTimeout(() => setMostrarSugestoes(false), 150)}
            />
          )}

          {mostrarSugestoes && sugestoesFiltradas.length > 0 && (
            <ul style={{
              position: "absolute",
              top: "130px", // ajusta conforme o espaço
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              margin: 0,
              padding: 0,
              listStyle: "none",
              zIndex: 10,
              width: "100%",
              maxWidth: "400px"
            }}>
              {sugestoesFiltradas.map((p, idx) => (
                <li
                  key={idx}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => enviarEscolha(p.nome)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                    color: "black"
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}
                >
                  {p.nome}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Lista cresce abaixo sem empurrar o input */}
        <div style={{
          flex: 1,
          width: "100%",
          marginTop: "10px",
          minHeight: "fit-content",
          height: "auto"
        }}>
          {listaDePersonagens.map((p, idx) => {
            const isMaisRecente = p.nome === personagemEscolhido.nome;

            return (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", gap: "10px",  color: "white" }}>
                  {Object.entries(p).map(([chave, valor], i) => (
                    <div
                      className="infoBox"
                      key={`${p.nome}-${chave}`}
                      style={{
                        backgroundColor: verificaCampo(p, chave),
                        animation: isMaisRecente ? `fadeInUp 0.4s ease forwards` : "none",
                        animationDelay: isMaisRecente ? `${i * 0.3}s` : "0s",
                        opacity: isMaisRecente ? 0 : 1,
                        padding: "6px",
                        borderRadius: "6px",
                        minWidth: "80px",
                        textAlign: "center"
                      }}
                    >
                                  {valor}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {venceu && (
          <div style={{ marginTop: "20px", fontWeight: "bold", color: "lime" }}>
            Venceu! O personagem é <strong id="venceu">{personagemDaVez.nome}</strong>
          </div>
        )}
      </div>

  );
}

export default App;