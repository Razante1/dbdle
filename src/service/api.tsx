import axios from 'axios';


const api = axios.create({
  baseURL: '',
  timeout: 10000, // opcional: cancela se demorar mais de 10s
});

// 2. Interceptor de REQUISIÇÃO: Envia o token em toda chamada
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('meu_token'); // ou de um estado global
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Interceptor de RESPOSTA: Trata erros globais
api.interceptors.response.use(
  (response) => response, // Se der tudo certo, apenas retorna a resposta
  (error) => {
    if (error.response && error.response.status === 401) {
      // Se a API retornar "Não autorizado", podemos limpar o storage e redirecionar
      console.error("Sessão expirada. Redirecionando...");
      localStorage.removeItem('meu_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;