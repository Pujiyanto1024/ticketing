import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log('listener connect NATS');

  const subscribetion = stan.subscribe('ticket:created', 'order-service-queue-group');

  subscribetion.on('message', (msg: Message) => {
    const data = msg.getData();

    if(typeof data === 'string') {
      console.log(`Receive event #${msg.getSequence()}, with data: ${data}`)
    }
  });
});