import fastify from 'fastify';
import { rabbit } from './lib/rabbit';

const app = fastify();

app.get('/', async (request, reply) => {
  reply.send({ hello: 'world' });
})

app.listen({port: 3001}, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);

  const response = async ()=> {
    const resp = await rabbit.getMessage("message-queue");
    console.log(resp);
  }
  setInterval(response, 1000);

});
