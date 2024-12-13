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

           <div class="bar-chart">
             <div class="bar" style="height: 150px;" title="15 livros Emprestados"></div>
             <div class="bar" style="height: 80px;" title="8 livros Reservados"></div>
             <div class="bar" style="height: 120px;" title="12 livros Devolvidos"></div>
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
       };
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
   
   .bar-chart {
     display: flex;
     justify-content: space-around;
     align-items: flex-end;
     margin-top: 30px;
   }
   
   .bar {
     width: 50px;
     background-color: #007bff;
     border-radius: 5px;
     transition: height 0.5s ease-in-out;
     cursor: pointer;
   }
   
   .bar:hover {
     background-color: #0056b3;
     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
   }
   
   footer {
     text-align: center;
     padding: 10px;
     background: #567a88;
     color: white;
   }
   </style>
   