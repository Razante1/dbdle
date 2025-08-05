import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [escolhaPersonagem, setEscolhaPersonagem] = useState('');
  const [personagem, setPersonagem] = useState('');
  const [dados, setDados] = useState([]);
  const [personagemDaVez, setPersonagemDaVez] = useState(null);
  const [venceu, setVenceu] = useState(false);

  const [personagemEscolhido, setPersonagemEscolhido] = useState('');
  const [listaDePersonagens, setListaDePersonagens] = useState([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [personagemComparado, setPersonagemComparado] = useState(null);


const termo = personagem?.toLowerCase() || '';

const sugestoesFiltradas = dados.filter(p =>
  p.name && p.name.toLowerCase().includes(termo) && termo !== ''
);

  const verificaCampo = (personagem, chave) => {

    return personagem[chave] === personagemDaVez[chave] ? "green" : "red";
  };


  const goTo = (id) => {
    if (venceu) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

const enviarEscolha = (name) => {
  setEscolhaPersonagem(name);
  const resultado = dados.find(p => p.name === name);
  if (resultado) {
    const comparado = { ...resultado }; // snapshot no momento da escolha
    setPersonagemComparado(comparado);  // 👈 salva aqui a versão correta para comparação
    setPersonagemEscolhido(comparado);

    if (comparado.name === personagemDaVez?.name) {
      setVenceu(true);
    }
  } else {
    const erro = { name: "personagem não encontrado!" };
    setPersonagemComparado(erro);
    setPersonagemEscolhido(erro);
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
      goTo("venceu");
    }
  };

useEffect(() => {
  const carregarTodosPersonagens = async () => {
    try {
      const primeiraResposta = await axios.get("https://dragonball-api.com/api/characters?page=1&limit=10");

      const totalPaginas = primeiraResposta.data.meta?.totalPages || 1;
      const primeiraPagina = primeiraResposta.data.items;


      const requisicoes = [];

      for (let pagina = 2; pagina <= totalPaginas; pagina++) {
        requisicoes.push(axios.get(`https://dragonball-api.com/api/characters?page=${pagina}&limit=10`));
      }


      const respostas = await Promise.all(requisicoes);


      const outrasPaginas = respostas.flatMap(res => res.data.items);
      const todosPersonagens = [...primeiraPagina, ...outrasPaginas];


      const modeloPersonagem = {
        name: "" ,
        race: "" ,
        gender: "",
        affiliation: "",
        ki: "",
        image: ""
      };

      const personagensFormatados = todosPersonagens.map(p => {
        return Object.keys(modeloPersonagem).reduce((acc, chave) => {
          acc[chave] = p[chave] || modeloPersonagem[chave];
          return acc;
        }, {});
      });

      setDados(personagensFormatados);

      const aleatorio = personagensFormatados[Math.floor(Math.random() * personagensFormatados.length)];
      setPersonagemDaVez(aleatorio);

    } catch (erro) {
      console.error("Erro ao buscar personagens:", erro);
    }
  };

  carregarTodosPersonagens();
}, []);
  useEffect(() => {
    if (
      personagemEscolhido &&
      personagemEscolhido.name !== "personagem não encontrado!"
    ) {
      setListaDePersonagens(prev => {
        if (prev.some(p => p.name === personagemEscolhido.name)) return prev;
        return [personagemEscolhido, ...prev];
      });
      setDados((prev) => prev.filter((i) => i.name !== personagemEscolhido.name));
    }
  }, [personagemEscolhido]);


  if (!personagemDaVez) {
    return <div style={{ color: "white", textAlign: "center", marginTop: "50px" }}>Carregando personagem da vez...</div>;
  }
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
      height: "40vh",
      margin: "auto",
      padding: "20px",
      boxSizing: "border-box",
    }}>
      <div style={{ width: "100%", marginBottom: "10px" }}>
        {!venceu && dados.length > 0 &&(
          <input
            className="inputPrincipal"
            value={personagem}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Digite ou selecione"
            style={{ width: "100%", padding: "8px", fontSize: "16px", marginTop: "10px", outline: "none" }}
            onFocus={() => setMostrarSugestoes(true)}
            onBlur={() => setTimeout(() => setMostrarSugestoes(false), 150)}
          />
        )}

        {mostrarSugestoes && sugestoesFiltradas.length > 0 && (
          <ul style={{
            position: "absolute",
            top: "100px",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "4px",
            margin: 0,
            padding: 0,
            listStyle: "none",
            zIndex: 10,
            width: "100%",
            maxWidth: "450px"
          }}>
            {sugestoesFiltradas.map((p, idx) => (
              <li
                key={idx}
                onMouseDown={e => e.preventDefault()}
                onClick={() => enviarEscolha(p.name)}
                style={{
                  padding: "8px",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                  color: "black"
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0f0f0"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#fff"}
              >
                {p.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{
        flex: 1,
        width: "100%",
        marginTop: "10px",
        minHeight: "fit-content",
        height: "auto"
      }}>
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            overflowY: "auto"
          }}>
            {!venceu && Object.entries(personagemDaVez).map(([chave, valor], index) => ( (chave !== "image") &&
              <div
                key={index}
                style={{
                  fontWeight: "bolder",
                  color: "white",
                  textShadow: "-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black",
                  width: "70px",
                  textAlign: "center"
                }}
              >
                {chave}
              </div>
            ))}
          </div>

        {!venceu && listaDePersonagens.map((p, idx) => {
            const isMaisRecente = p.name === personagemComparado?.name;
            return (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <div style={{ display: "flex", gap: "10px", color: "white" }}>
                  {Object.entries(p).map(([chave, valor], i) => (
                    chave !== "image" && (
                      <div key={`${p.name}-${chave}`} style={{ position: "relative" }}>
                        
                        {chave === "ki" && isMaisRecente && (
                          personagemComparado?.ki < personagemDaVez.ki ? (
                            <div
                              className="seta para-cima"
                              style={{ animationDelay: `${i * 0.3}s` }}
                            />
                          ) : personagemComparado?.ki > personagemDaVez.ki ? (
                            <div
                              className="seta para-baixo"
                              style={{ animationDelay: `${i * 0.3}s` }}
                            />
                          ) : null
                        )}

                        {/* Caixa com valor */}
                        <div
                          className="infoBox"
                          style={{
                            backgroundColor: verificaCampo(p, chave),
                            animation: isMaisRecente
                              ? `fadeInUp 0.4s ease forwards`
                              : "none",
                            animationDelay: isMaisRecente ? `${i * 0.3}s` : "0s",
                            opacity: isMaisRecente ? 0 : 1,
                            padding: "6px",
                            borderRadius: "6px",
                            minWidth: "80px",
                            textAlign: "center",
                          }}
                        >
                          {valor}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            );
          })}
      </div>
      {console.log(personagemDaVez)}
      {console.log(personagemEscolhido)}
      {venceu && (
        <div style={{backgroundColor: "darkblue" , width: "600px",display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "100px 0", fontWeight: "bold", color: "lime" }}>
          Venceu! O personagem é <strong id="venceu">{personagemDaVez.name}</strong>
          <img id="imagem" src={personagemDaVez.image} alt={personagemDaVez.name} style={{ width: '200px', borderRadius: '8px' }} />
        </div>
      )}
    </div>
  );
}

export default App;
