const
  fs = require('fs'),
  ethereumJsWallet = require('ethereumjs-wallet'),
  providerEngine = require('web3-provider-engine'),
  walletSubprovider = require('web3-provider-engine/subproviders/wallet.js'),
  web3SubProvider = require('web3-provider-engine/subproviders/web3.js'),
  web3 = require('web3'),
  filterSubProvider = require('web3-provider-engine/subproviders/filters.js')

if (fs.existsSync("secret.json")) {
  secret = JSON.parse(fs.readFileSync('secret.json'), 'utf8');
  privateKey = secret.privateKey;
  wallet = ethereumJsWallet.fromPrivateKey(new Buffer(privateKey, 'hex'));
  address = wallet.getAddress().toString('hex');
  console.log('YOUR ETHERUM ADDRESS.....', address)
} else {
  console.log('NO SECRET FILE FOUND PLEASE TRY WITH TESTRPC')
}

let initProvider = (providerUrl) => {
  let engine = new providerEngine();
  engine.addProvider(new filterSubProvider());
  engine.addProvider(new walletSubprovider());
  engine.addProvider(new web3SubProvider());
  engine.start();
  return engine;
}

// 1 eth = 10^18 wei
// 1 gwei = 10^9 wei

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 9545,
      network_id: '*',
      gas: 4500000,
      gasPrice: 100000000
    },
    ropsten: {
      provider: function () {
        return initProvider('https://ropsten.infura.io/A3Yn1ptLQtN3eaUqHoYN'); //Secure, reliable, and scalable access to Ethereum APIs and IPFS gateways.
      },
      from: address,
      network_id: '*',
      gas: 4500000,
      gasPrice: 1000000000
    }
  }
}