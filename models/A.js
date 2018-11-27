const
  config = require("../config");

const
  Web3 = require("web3"),
  Promise = require("bluebird");

const
  web3 = new Web3(new Web3.providers.HttpProvider(config.get("web3:url"))),
  owner = config.get("web3:owner"),
  privateKey = config.get("web3:privateKey"),
  gasPrice = config.get("web3:gasPrice"),
  gasLimit = config.get("web3:gasLimit"),
  chainId = config.get("web3:chainId");


class a {

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
    let sendRawTransaction = Promise.promisify(web3.eth.sendRawTransaction);
    const
      contractA_abi = require("../build/contracts/A").abi,
      contractA_address = require("../config/contracts").A,
      contract = web3.eth.contract(contractA_abi),
      instance = contract.at(contractA_address);
    var
      self = this;
    let data = instance.modifyB_name.getData(
      web3.fromAscii(_id),
      _newName, {
        from: owner
      });

    return this.getTransactionCount(owner)
      .then(count => {
        let rawTransaction = {
          "from": owner,
          "nonce": web3.toHex(count),
          "gasPrice": web3.toHex(gasPrice),
          "gasLimit": web3.toHex(gasLimit),
          "to": contractA_address,
          "value": "0x0",
          "data": data,
          "chainId": chainId
        };

        let tx = new eth.Tx(rawTransaction);
        tx.sign(new Buffer(ownerPrivateKey, "hex"));

        let serializedTx = tx.serialize();
        return sendRawTransaction('0x' + serializedTx.toString('hex'))
      }).then(function (txHash) {
        console.log("@createNewAsset() txHash ----> ", txHash);
        return self.waitForReceipt(txHash, 3000)

      });
  }

  getB(_id) {
    console.log("Inside getB")
    const
      contractA_abi = require("../build/contracts/A").abi,
      contractA_address = require("../config/contracts").A;
    return new Promise((resolve, reject) => {
      const
        contract = web3.eth.contract(contractA_abi),
        instance = contract.at(contractA_address);
      instance.getB.call(web3.fromAscii(_id), (err, result) => {
        resolve(result);
        reject(err);
      })
    })
  }

}

module.exports = a;