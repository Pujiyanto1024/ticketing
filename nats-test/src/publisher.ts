import nats from 'node-nats-streaming';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
});

stan.on('connect', () => {
  console.log('Publiser connected to NATS');

  const data = JSON.stringify({
    id: '123',
    title: 'concert',
    price: 20
  });

  stan.publish('ticket:created', data, () => {
    console.log('Event Published');
  })
});

//before start publisher or listener, must create port forwarding on kubernetes
// kubectl port-forward <pod name> <port kubernetes>:<expected port>
// monitoring => localhost:8222/streaming