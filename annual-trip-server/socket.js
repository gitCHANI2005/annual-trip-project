let ioInstance = null;

function initSocket(io) {
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

function getIO() {
  if (!ioInstance) {
    throw new Error('Socket.io is not initialized');
  }

  return ioInstance;
}

module.exports = {
  initSocket,
  getIO,
};