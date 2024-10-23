import express from "express";

const host = "0.0.0.0";
const porta = 3000;
const app = express();

function tabuada (requisicao, resposta) {
    let tabuada = requisicao.query.tabuada;
    let sequencia = requisicao.query.sequencia;
    let resultado;
    if (sequencia == null) {
        sequencia = 10;
    }
    if (tabuada) {
        resposta.write(`<html>
            <head>
               <meta charset="UTF-8">
               <title>Tabuada</title>
            </head>
            <body>`);  
        for(let i = 0; i <= sequencia; i++) {
            resultado = tabuada * i;
            resposta.write (`${tabuada} x ${i} = ${resultado} <br>`);
        }
        resposta.write("</body> </html>") 
    }
    else {
        resposta.write(`<html>
            <head>
               <meta charset="UTF-8">
               <title>Tabuada</title>
            </head>
            <body>
                <h3>Informe corretamento o número da tabuada e a sequencia</h3>
                <h3>Exemplo: /?tabuada=3&sequencia=15</p></h3>
            </body>
            </html>`);
    }
    resposta.end();
}

app.get("/", tabuada);

app.listen(porta, host, () =>{ 
    console.log("Servidor em execução http://" + host + ":" + porta);
})