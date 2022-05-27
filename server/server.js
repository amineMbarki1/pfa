const dotenv = require('dotenv');
dotenv.config({ path: './conf/.env' });

const db = require('./conf/db');
const app = require('./app');
const server = require('http').createServer(app);

const { Server } = require('socket.io');

const io = new Server(server);

let deliveryAgents = {};

const addDeliveryAgent = ({ deliveryAgentId, position, city }) => {
  if (!Object.keys(deliveryAgents).includes(city)) deliveryAgents[city] = [];
  if (!deliveryAgents[city].some((deliveryAgent) => deliveryAgent.id === deliveryAgentId))
    deliveryAgents[city].push({ id: deliveryAgentId, position });
};

const updatePosition = ({ deliveryAgentId, position, city }) => {
  deliveryAgents[city] = deliveryAgents[city].map((deliveryAgent) =>
    deliveryAgent.id === deliveryAgentId ? { ...deliveryAgent, position: position } : deliveryAgent
  );
};

io.on('connection', (socket) => {
  socket.on('JOIN_CITY', (city) => {
    socket.join(city);
  });

  socket.on('JOIN_DELIVERY_REQUEST', (deliveryAgentId) => {
    socket.join(deliveryAgentId);
  });

  socket.on('SEND_DELIVERY_REQUEST', ({ deliveryAgentId }) => {
    console.log('delivery Request received', deliveryAgentId);
    socket.to(deliveryAgentId).emit('RECEIVE_DELIVERY_REQUEST', 'New Delivery Request');
  });

  socket.on('SEND_LOCATION', ({ deliveryAgentId, position, city }) => {
    addDeliveryAgent({ deliveryAgentId, city, position });
    updatePosition({ deliveryAgentId, city, position });
    console.log(deliveryAgents);
    socket.to(city).emit('RECEIVE_LOCATION', deliveryAgents[city]);
  });
});

server.listen(process.env.PORT || 5000, async () => {
  await db();
  console.log('Lisetning on port 5000');
});
