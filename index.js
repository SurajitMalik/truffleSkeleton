const debug = require('debug')('contracts:server'),
  jayson = require('jayson');

const config = require('./config'),
  pjson = require('./package.json'),
  methods = require('./server/methods');

function ContractServer(owner, privateKey, contractAddress) {
  this.server = jayson.server(methods, {
    collect: false
  });
}

/**
 * Returns server instance.
 */
ContractServer.prototype.start = function (host, port) {
  var serverHost = host || config.get('host');
  var serverPort = port || config.get('port');
  this.server.tcp().listen(serverPort, serverHost);
  process.title = pjson.name + " " + pjson.version;
  debug("contract service started on %s:%s", serverHost, serverPort);
};

/**
 * Stop server
 */
ContractServer.prototype.stop = function () {
  var self = this;
  var close = function () {
    self.server.tcp() && self.server.tcp().close();
    process.exit();
  };

  process.on('uncaughtException', function (err) {
      debug(err.stack);
      debug('uncaughtException', err);
    })
    .on('SIGINT', close)
    .on('SIGTERM', close)
    .on('exit', close);

  close();
};

module.exports = ContractServer;
