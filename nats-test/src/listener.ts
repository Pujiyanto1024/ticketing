import nats, { Message } from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', '123', {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log('listener connect NATS');

  const subscribetion = stan.subscribe('ticket:created');

  subscribetion.on('message', (msg: Message) => {
    const data = msg.getData();

    if(typeof data === 'string') {
      console.log(`Receive event #${msg.getSequence()}, with data: ${data}`)
    }
  });
});