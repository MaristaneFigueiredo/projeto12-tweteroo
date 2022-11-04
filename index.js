import tweets from "./tweets.js";


//biblioteca do node que cria um servidor que é capaz de receber requisições através do protocolo http
import express from "express";

//cors - serve para liberar as portas da nossa api para que o front end, que está externo, entre com segurança. Baixar esta biblioteca - npm i cors
import cors from "cors";


//config
const app = express();
app.use(cors());

let usuarios =[]

usuarios = [
  {
      username: "2",
      avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info"
      // avatar: "https://t2.ea.ltmcdn.com/pt/razas/0/8/3/calopsita_380_0_orig.jpg"
      // avatar: "https://t2.ea.ltmcdn.com/pt/razas/0/8/3/calopsita_380_1_orig.jpg"
  }
]


//estou permitindo o app receber requisições do tipo get. O get recebe dois parâmetros. 1) o nome da rota(é o caminho que meu cliente acessará) e 2) O que ele fará? - function. Obs.: O get, por padrão, já é uma requisição automática. Isso significa q só preciso de fato RESPONDER
app.get("/tweets", (request, response) => {  

  const tweetsReturn = tweets.map( (t) => {
    const user = usuarios.find( (u) => u.username = t.username )
    //  console.log('user',user)
    return {username:t.username, avatar:user.avatar, tweet:t.tweet}

  })
  const tenLastTweets = tweetsReturn.slice(-10)

  response.send(tenLastTweets);
});





// o cliente passar uma informação no request e o retorno acontece de acordo com a informação
app.get('/tweets/:username', (req, res) => {

  const userName = req.params.username

  const tweet = tweets.find((t) => t.username === userName)
  
  res.send(tweet)
})




// Ligo meu servidor na porta 5000
app.listen(5000, () => {
  console.log("Server running in port 5000");
});



//20:23