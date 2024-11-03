import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: true }));

const porta = 3000;
const host = '0.0.0.0';

var listaProdutos = [];

function cadastroProdutoView(req, resp) {
    resp.send(`
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Cadastro de Produto</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">Sistema de Cadastro</a>
                    </div>
                </nav>
                
                <div class="container mt-5">
                    <div class="row justify-content-center">
                        <div class="col-md-8">
                            <h1 class="text-center mb-4">Cadastro de Produto</h1>
                            <form method="POST" action="/" class="border p-4 rounded bg-light shadow-sm">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label for="codigo" class="form-label">Código do Produto</label>
                                        <input type="text" class="form-control" id="codigo" name="codigo" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="nomeProduto" class="form-label">Nome do Produto</label>
                                        <input type="text" class="form-control" id="nomeProduto" name="nomeProduto" required>
                                    </div>
                                    <div class="col-md-12">
                                        <label for="descricao" class="form-label">Descrição</label>
                                        <input type="text" class="form-control" id="descricao" name="descricao" required>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="categoria" class="form-label">Categoria</label>
                                        <select class="form-select" id="categoria" name="categoria" required>
                                            <option disabled selected value="0">Selecione Uma Opção</option>
                                            <option value="Roupa">Roupa</option>
                                            <option value="Calçado">Calçado</option>
                                            <option value="Boné">Boné</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="marca" class="form-label">Marca</label>
                                        <select class="form-select" id="marca" name="marca" required>
                                            <option disabled selected value="0">Selecione Uma Opção</option>
                                            <option value="Nike">Nike</option>
                                            <option value="Adidas">Adidas</option>
                                            <option value="Puma">Puma</option>
                                            <option value="New Balance">New Balance</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="preco" class="form-label">Preço de Venda</label>
                                        <input type="number" class="form-control" id="preco" name="preco" step="0.01" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="custo" class="form-label">Custo do Produto</label>
                                        <input type="number" class="form-control" id="custo" name="custo" step="0.01" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="quantidade" class="form-label">Quantidade em Estoque</label>
                                        <input type="number" class="form-control" id="quantidade" name="quantidade" required>
                                    </div>
                                    <div class="col-12 text-center mt-4">
                                        <button class="btn btn-primary" type="submit">Cadastrar Produto</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);
}

function cadastrarProduto(req, resp) {
    const { codigo, nomeProduto, descricao, categoria, marca, preco, custo, quantidade } = req.body;
    const produto = { codigo, nomeProduto, descricao, categoria, marca, preco, custo, quantidade };
    listaProdutos.push(produto);

    resp.write(`
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Lista de Produtos</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
            </head>
            <body>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="/">Sistema de Cadastro</a>
                    </div>
                </nav>
                
                <div class="container mt-5">
                    <h2 class="text-center">Lista de Produtos Cadastrados</h2>
                    <div class="table-responsive mt-4">
                        <table class="table table-bordered table-striped">
                            <thead class="table-dark">
                                <tr>
                                    <th scope="col">Código</th>
                                    <th scope="col">Nome do Produto</th>
                                    <th scope="col">Descrição</th>
                                    <th scope="col">Categoria</th>
                                    <th scope="col">Marca</th>
                                    <th scope="col">Preço</th>
                                    <th scope="col">Custo</th>
                                    <th scope="col">Quantidade</th>
                                </tr>
                            </thead>
                            <tbody>`);
    for (const produto of listaProdutos) {
        resp.write(`
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.nomeProduto}</td>
                <td>${produto.descricao}</td>
                <td>${produto.categoria}</td>
                <td>${produto.marca}</td>
                <td>R$ ${produto.preco}</td>
                <td>R$ ${produto.custo}</td>
                <td>${produto.quantidade}</td>
            </tr>`);
    }
    resp.write(`
                            </tbody>
                        </table>
                        <div class="text-center mt-4">
                            <a class="btn btn-primary" href="/">Cadastrar Novo Produto</a>
                        </div>
                    </div>
                </div>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
        </html>
    `);

    resp.end();
}

app.get('/', cadastroProdutoView);
app.post('/', cadastrarProduto);

app.listen(porta, host, () => {
    console.log(`Servidor iniciado e em execução no endereço http://${host}:${porta}`);
});
