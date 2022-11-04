import express from 'express'

const app = express()

//estou permitindo o app receber requisições do tipo get. O get recebe dois parâmetros. 1) o nome da rota e 2) O que ele fará? - function. Obs.: O get já é uma requisição automática, ou seja, eu só preciso de fato RESPONDER
app.get("/tweets", (request, response) => {
    response.send('oi')
} )

// importante ficar no final do código
app.listen(5000, () => {
    console.log('Server running in: port 5000')
})