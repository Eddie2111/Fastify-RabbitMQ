import fastify from 'fastify';
import { rabbit } from './lib/rabbit';

const app = fastify({
  logger: true
});

app.get("/", async (req, res) => {
  res.send({message: "Hello World"});
})

interface messageBodyProps {
  message: string;
}
interface errorProps {
  message: string;
}
app.post("/message", async (req, res) => {
  const data = req.body as any;
  if(!data.message) {
    return res.status(400).send({message: "Message is required"});
  }
  try{
    await rabbit.publishMessage("message-queue", data.message);
    return res.send({message: "Message sent to queue"});
  } catch(err: any) {
    const error = err as errorProps;
    console.log(error.message);
    return res.status(400).send({message: "Message failed to queue"});
  }
})


app.listen({ port: 3000}, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
});