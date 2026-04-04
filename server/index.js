require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const { initSocket } = require('./utils/socket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());
app.set('io', io);

connectDB();
initSocket(io);

app.use('/api/users',  require('./routes/users'));
app.use('/api/sos',    require('./routes/sos'));
app.use('/api/trip',   require('./routes/trip'));
app.use('/api/driver', require('./routes/driver'));
app.use('/api/chat',   require('./routes/chat'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

server.listen(process.env.PORT || 5000, () =>
  console.log('Server running on port', process.env.PORT || 5000));