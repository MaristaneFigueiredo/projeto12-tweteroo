import tweets from "./tweets.js";

//biblioteca do node que cria um servidor que é capaz de receber requisições através do protocolo http
import express from "express";

//cors - serve para liberar as portas da nossa api para que o front end, que está externo, entre com segurança. Baixar esta biblioteca - npm i cors
import cors from "cors";

//config
const app = express();
app.use(cors());
app.use(express.json()); // express vamos receber dados Json

let usuarios = [];

// usuarios = [
//   {
//     username: "2",
//     avatar:
//       "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
//     // avatar: "https://t2.ea.ltmcdn.com/pt/razas/0/8/3/calopsita_380_0_orig.jpg"
//     // avatar: "https://t2.ea.ltmcdn.com/pt/razas/0/8/3/calopsita_380_1_orig.jpg"
//   },
// ];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    res.status(422).send("Todos os campos são obrigatórios");
    return;
  }

  const userExist = usuarios.find((u) => u.username === username);

  if (userExist) {
    res.status(409).send("Usuário já existe");
    return;
  }

  usuarios.push(req.body);
  res.sendStatus(200);
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  if (!username || !tweet) {
    res.status(422).send("Todos os campos são obrigatórios");
    return;
  }

  tweets.push(req.body);
  res.sendStatus(200);
});

//estou permitindo o app receber requisições do tipo get. O get recebe dois parâmetros. 1) o nome da rota(é o caminho que meu cliente acessará) e 2) O que ele fará? - function. Obs.: O get, por padrão, já é uma requisição automática. Isso significa q só preciso de fato RESPONDER
app.get("/tweets", (request, response) => {
  const tweetsReturn = tweets.map((t) => {
    const user = usuarios.find((u) => (u.username = t.username));
    //  console.log('user',user)
    return { username: t.username, avatar: user.avatar, tweet: t.tweet };
  });
  const tenLastTweets = tweetsReturn.slice(-10);

  response.send(tenLastTweets);
});

// Ligo meu servidor na porta 5000
app.listen(5000, () => {
  console.log("Server running in port 5000");
});
