let ioInstance;

const initSocket = (io) => {
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join:guardian', ({ userId }) => {
      socket.join(`guardian:${userId}`);
      console.log('Guardian watching userId:', userId);
    });

    socket.on('location:update', ({ tripId, userId, lat, lng }) => {
      io.emit(`trip:${userId}`, { lat, lng, tripId });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

const getIO = () => ioInstance;

module.exports = { initSocket, getIO };