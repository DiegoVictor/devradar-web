module.exports = (request, options) => {
  if (request.search(/socket\.io-client/gi) > -1) {
    return `${options.rootDir}/mocks/socket.io-client.js`;
  }
  return options.defaultResolver(request, options);
};
