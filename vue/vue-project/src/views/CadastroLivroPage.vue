<template>
    <div class="books-container" id="books-container">
        <h2>Livros Cadastrados</h2>
        <!-- Lista de livros será inserida aqui -->
    </div>

    <div class="container">
        <h1>Gerenciar Livros</h1>
        <form id="book-form">
            <div class="form-group">
                <label for="title">Título</label>
                <input type="text" id="title" name="title" placeholder="Digite o título do livro" required>
            </div>
            <div class="form-group">
                <label for="author">Autor</label>
                <input type="text" id="author" name="author" placeholder="Digite o autor do livro" required>
            </div>
            <div class="form-group">
                <label for="year">Ano</label>
                <input type="number" id="year" name="year" placeholder="Digite o ano de publicação" required>
            </div>
            <div class="form-group">
                <label for="id">ID (para atualizar/remover)</label>
                <input type="number" id="id" name="id" placeholder="Digite o ID do livro">
            </div>
            <button type="button" onclick="addBook()">Cadastrar Livro</button>
            <button type="button" onclick="updateBook()">Atualizar Livro</button>
            <button type="button" onclick="deleteBook()">Remover Livro</button>
            <button type="button" onclick="fetchBooks()">Atualizar Lista</button>
        </form>
    </div>
</template>

<script>
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
            flex-direction: column; /* Permite exibição em coluna */
        }

        .container {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 30px;
            width: 350px;
            transition: transform 0.3s, box-shadow 0.3s;
            margin-bottom: 20px; /* Espaço entre a lista e o formulário */
        }

        .container:hover {
            transform: scale(1.02);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
        }

        .form-group {
            margin-bottom: 20px;
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
            transition: border 0.3s;
        }

        input:focus {
            border-color: #28a745;
            outline: none;
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
            transition: background 0.3s;
        }

        button:hover {
            background: #218838;
        }

        .books-container {
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            width: 350px;
            overflow-y: auto;
            max-height: 300px; /* Limita a altura da lista */
        }

        .book-item {
            margin-bottom: 10px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: #f9f9f9;
        }

        .book-item:last-child {
            margin-bottom: 0;
        }

        @media (max-width: 400px) {
            .container,
            .books-container {
                width: 90%;
            }
        }
</style>