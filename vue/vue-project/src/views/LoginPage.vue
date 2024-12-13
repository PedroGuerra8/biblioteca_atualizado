<template>
  <div class="container" id="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Usuário:</label>
        <input
          v-model="username"
          type="text"
          id="username"
          name="username"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Senha:</label>
        <input
          v-model="password"
          type="password"
          id="password"
          name="password"
          required
        />
      </div>
      <button type="submit">Entrar</button>
    </form>

    <div class="toggle-link">
      <p>
        Ainda não tem uma conta?
        <router-link to="/criar" id="show-signup">Crie uma conta</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("http://localhost:4000/api/user/login", {
          username: this.username,
          password: this.password,
        });

        // Verifica se a resposta contém o token
        if (response.data ) {
          // Armazena o token no localStorage
          localStorage.setItem("authToken", response.data.token);

          // Exibe a mensagem de sucesso
          alert("Login realizado com sucesso!");

          // Redireciona para a página home após o login
          this.$router.push({ name: 'home' });
        } else {
          alert("Erro: Token não retornado pela API.");
        }
      } catch (error) {
        console.error("Erro ao fazer login:", error);
        alert("Erro ao tentar realizar o login.");
      }
    },
  },
};
</script>

 <style scoped>
* {
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 30px;
  width: 350px;
  transition: transform 0.3s, box-shadow 0.3s; /* Adiciona transições para feedback visual */
}

.container:hover {
  transform: scale(1.02); /* Efeito de zoom ao passar o mouse */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Aumenta a sombra ao passar o mouse */
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px; /* Espaço abaixo do título */
}

.form-group {
  margin-bottom: 20px; /* Espaço entre os campos */
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border 0.3s; /* Transição suave para o foco */
}

input:focus {
  border-color: #28a745; /* Cor da borda ao focar */
  outline: none; /* Remove o contorno padrão */
}

button {
  background: #28a745;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;
  font-size: 16px;
  transition: background 0.3s; /* Transição suave para o hover */
}

button:hover {
  background: #218838; /* Cor ao passar o mouse */
}

.toggle-link {
  text-align: center;
  margin-top: 15px;
}

.toggle-link a {
  color: #007bff;
  text-decoration: none;
}

.toggle-link a:hover {
  text-decoration: underline;
}

.hidden {
  display: none;
}

/* Responsividade */
@media (max-width: 400px) {
  .container {
    width: 90%; /* Ajusta a largura em telas pequenas */
  }
}
</style>