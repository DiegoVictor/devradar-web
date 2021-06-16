let callback;
export const emit = payload => {
  callback(payload);
};

export const connect = jest.fn();
export const disconnect = jest.fn();

export const events = {};
export const on = jest.fn((name, cb) => {
  events[name] = cb;
});

export const socket = {
  on,
  io: {
    opts: {
      query: {},
    },
  },
  connect,
  disconnect,
};

export default (url, options) => {
  socket.url = url;
  socket.options = options;
  return socket;
};
