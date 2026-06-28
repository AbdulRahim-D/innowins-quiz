let io = null;

/**
 * Set the Socket.IO server instance.
 * @param {object} ioInstance - The Socket.IO server instance
 */
export const setIO = (ioInstance) => {
  io = ioInstance;
};

/**
 * Get the Socket.IO server instance.
 * @returns {object|null} The Socket.IO server instance or null
 */
export const getIO = () => {
  return io;
};
