const
  config = require("../config");

const
  Web3 = require("web3"),
  Promise = require("bluebird"),
  eth = require("ethereumjs-lib"),
  BigNumber = require('bignumber.js'),
  ethereumjsWallet = require("ethereumjs-wallet"),
  ProviderEngine = require("web3-provider-engine"),
  WalletSubprovider = require("web3-provider-engine/subproviders/wallet.js"),
  Web3Subprovider = require("web3-provider-engine/subproviders/web3.js"),
  FilterSubprovider = require("web3-provider-engine/subproviders/filters.js");


class a {

  constructor() {

    let initProvider = (self) => {

      let wallet = ethereumjsWallet.fromPrivateKey(new Buffer(self.privateKey, "hex"));
      let engine = new ProviderEngine();
      engine.addProvider(new FilterSubprovider());
      engine.addProvider(new WalletSubprovider(wallet, {}));
      engine.addProvider(new Web3Subprovider(new Web3.providers.HttpProvider(self.providerUrl)));
      engine.start();
      return engine;
    };

    this.owner = config.get("web3:owner");
    this.privateKey = config.get("web3:privateKey");
    this.providerUrl = config.get("web3:url");
    this.gasLimit = config.get("web3:gasLimit");
    this.gasPrice = config.get("web3:gasPrice");
    this.chainId = config.get("web3:chainId");

    this.web3 = new Web3(initProvider(this));
  }

  getTransactionCount(address) {
    let getTransactionCount = Promise.promisify(this.web3.eth.getTransactionCount);
    return getTransactionCount(address);
  }

  getBlock(blockNumber) {
    let getBlock = Promise.promisify(this.web3.eth.getBlock);
    return getBlock(blockNumber);
  }


  getBalance(address) {
    let getBalance = Promise.promisify(this.web3.eth.getBalance);
    return getBalance(address);
  }


  getGasPrice() {
    let getGasPrice = Promise.promisify(this.web3.eth.getGasPrice);
    return getGasPrice();
  }


  estimateGas(to, data) {
    let estimateGas = Promise.promisify(this.web3.eth.estimateGas);
    return estimateGas({
      to: to,
      data: data
    });
  }

  getTransactionReceipt(txHash) {
    let getTransactionReceipt = Promise.promisify(this.web3.eth.getTransactionReceipt);
    return getTransactionReceipt(txHash);
  }

  waitForReceipt(txHash, delay) {
    var self = this;
    return Promise.delay(delay)
      .then(function () {
        return self.getTransactionReceipt(txHash);
      })
      .then(function (receipt) {
        if (receipt) return receipt.transactionHash;
        else return self.waitForReceipt(txHash, delay * 2);
      });
  }

  modifyB_name(_id, _newName) {
    let sendRawTransaction = Promise.promisify(this.web3.eth.sendRawTransaction);
    const
      contractA_abi = require("../build/contracts/A").abi,
      contractA_address = require("../config/contracts").A,
      contract = this.web3.eth.contract(contractA_abi),
      instance = contract.at(contractA_address);
    var
      self = this;
    let data = instance.modifyB_name.getData(
      this.web3.fromAscii(_id),
      _newName, {
        from: this.owner
      });

    console.log("*** data", data);

    return this.getTransactionCount(this.owner)
      .then(count => {
        console.log("*** Transaction count", count);
        let rawTransaction = {
          "from": this.owner,
          "nonce": this.web3.toHex(count),
          "gasPrice": this.web3.toHex(this.gasPrice),
          "gasLimit": this.web3.toHex(this.gasLimit),
          "to": contractA_address,
          "value": "0x0",
          "data": data,
          "chainId": this.chainId
        };

        let tx = new eth.Tx(rawTransaction);
        tx.sign(new Buffer(this.privateKey, "hex"));

        let serializedTx = tx.serialize();
        return sendRawTransaction('0x' + serializedTx.toString('hex'))
      }).then(function (txHash) {
        console.log("*** @modifyB_name() txHash ----> ", txHash);
        return self.waitForReceipt(txHash, 3000)

      });
  }

  getB(_id) {
    console.log("*** Inside getB")
    const
      contractA_abi = require("../build/contracts/A").abi,
      contractA_address = require("../config/contracts").A;
    return new Promise((resolve, reject) => {
      const
        contract = this.web3.eth.contract(contractA_abi),
        instance = contract.at(contractA_address);
      instance.getB.call(this.web3.fromAscii(_id), (err, result) => {
        resolve(result);
        reject(err);
      })
    })
  }

}

module.exports = a;
