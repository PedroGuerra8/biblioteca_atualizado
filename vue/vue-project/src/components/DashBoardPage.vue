<template>
     <header>
       <h1>Dashboard Biblioteca</h1>
     </header>
     <div class="container">
       <aside class="sidebar">
         <h2>Menu</h2>
         <ul>
           <li><router-link to="/home" class="opcao-menu">Home</router-link></li>
           <li><router-link to="/login" class="opcao-menu">Login</router-link></li>
           <li><router-link to="/criar" class="opcao-menu">Criar</router-link></li>
           <li><router-link to="/cadastro-livro" class="opcao-menu">Cadastro de Livros</router-link></li>
         </ul>
       </aside>
       <main>
         <section class="dashboard">
           <h2>Status Geral</h2>
           <div class="status-cards">
             <div class="status-card">
               <h3>Emprestados</h3>
               <p>{{ stats.borrowed }} livros</p>
             </div>
             <div class="status-card">
               <h3>Reservados</h3>
               <p>{{ stats.reserved }} livros</p>
             </div>
             <div class="status-card">
               <h3>Devolvidos</h3>
               <p>{{ stats.returned }} livros</p>
             </div>
           </div>
   
           <h3>Livros Reservados</h3>
           <div class="book-list">
             <div class="book" v-for="book in reservedBooks" :key="book.title">
               <h4>{{ book.title }}</h4>
               <p>{{ book.author }}</p>
             </div>
           </div>
   
           <h3>Gráfico de Status</h3>
           <!-- Exemplo de gráfico (imagine que você usaria uma lib como Chart.js ou Vue-chartjs) -->
           <div class="chart-container">
             <canvas id="statusChart"></canvas>
           </div>
         </section>
       </main>
     </div>
   </template>
   
   <script>
   export default {
     data() {
       return {
         stats: {
           borrowed: 15,
           reserved: 8,
           returned: 12,
         },
         reservedBooks: [
           { title: 'Café com Deus Pai', author: 'Júnior Rostirola' },
           { title: 'A Mente Moralista', author: 'Jonathan Haidt' },
           { title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry' },
           { title: 'Os Segredos da Mente Milionária', author: 'T. Harv Eker' },
         ],
         // Dados para o gráfico
         chartData: {
           labels: ['Emprestados', 'Reservados', 'Devolvidos'],
           datasets: [
             {
               data: [15, 8, 12], // Exemplo de contagem de livros em cada status
               backgroundColor: ['#007bff', '#ffcc00', '#28a745'],
             },
           ],
         },
       };
     },
     mounted() {
       // Exemplo de como criar um gráfico usando Chart.js (ou Vue-chartjs)
       const ctx = document.getElementById('statusChart').getContext('2d');
       new Chart(ctx, {
         type: 'pie',
         data: this.chartData,
       });
     },
   };
   </script>
   
   <style scoped>
   .container {
     display: flex;
   }
   
   .sidebar {
     width: 250px;
     background-color: #54cfcf;
     color: white;
     padding: 20px;
   }
   
   .main {
     flex: 1;
     padding: 20px;
   }
   
   .dashboard h2 {
     text-align: center;
   }
   
   .status-cards {
     display: flex;
     justify-content: space-around;
     margin-bottom: 20px;
   }
   
   .status-card {
     background: #fff;
     border: 1px solid #ccc;
     padding: 20px;
     text-align: center;
     border-radius: 8px;
     box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
   }
   
   .book-list {
     margin-top: 20px;
   }
   
   .book {
     background-color: #f4f4f4;
     padding: 10px;
     margin: 10px 0;
     border-radius: 5px;
   }
   
   .chart-container {
     width: 50%;
     margin: 0 auto;
     padding-top: 30px;
   }
   
   footer {
     text-align: center;
     padding: 10px;
     background: #567a88;
     color: white;
   }
   </style>
   