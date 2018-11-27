const
  HDWalletProvider = require("truffle-hdwallet-provider"),
  PrivateKeyProvider = require("truffle-privatekey-provider"),
  secrets = require("./secrets.json");

// 1 eth = 10^18 wei
// 1 gwei = 10^9 wei

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 9545,
      network_id: '*',
      gas: 4500000,
      gasPrice: 1000000000
    },
    testrpc: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
      gas: 4500000,
      gasPrice: 1000000000
    },
    ropsten: {
      provider: new PrivateKeyProvider(secrets.privateKey, "https://ropsten.infura.io/A3Yn1ptLQtN3eaUqHoYN"),
      network_id: '*',
      gas: 4500000,
      gasPrice: 25000000000,
    },
    kovan: {
      provider: new HDWalletProvider(secrets.mnemonic, "https://kovan.infura.io/[key]"),
      from: secrets.address,
      network_id: "*",
      gas: 4500000,
      gasPrice: 25000000000,
    },
    rinkeby: {
      provider: new HDWalletProvider(secrets.mnemonic, "https://rinkeby.infura.io/[key]"),
      from: secrets.address,
      network_id: "*",
      gas: 4500000,
      gasPrice: 25000000000
    }
  }
}