const
  config = require("../config");

const
  Web3 = require("web3"),
  Promise = require("bluebird");

const
  // web3 = new Web3(config.get("web3:url")),
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")),
  owner = config.get("web3:owner"),
  password = config.get("web3:password"),
  gasPrice = config.get("web3:gasPrice"),
  gasLimit = config.get("web3:gasLimit");


class a {

  getB(_id) {
    console.log("Inside getB")
    const
      contractA_abi = require("../build/contracts/A").abi,
      contractA_address = require("../config/contracts").A;
    return new Promise((resolve, reject) => {
      // const contractInstance = new web3.eth.Contract(contractA_abi, contractA_address);
      const
        contract = web3.eth.contract(contractA_abi),
        instance = contract.at(contractA_address);
      // console.log("Smart contract constant method call ----> ", instance.getB_name(_id));
      // console.log("Contract Instance ----> ", instance);
      instance.getB_name.call(web3.fromAscii(_id), (err, result) => {
        console.log("Smart contract constant method call ----> ", result, err);
        // resolve(result);
        // reject(err);
      })
      // contractInstance.methods.getB_name(
      //   _id
      // ).call({
      //   from: owner
      // }, (err, transactionhash) => {
      //   if (err) {
      //     console.log(err)
      //   } else {
      //     console.log(transactionhash)
      //   }
      // }).then((result) => {
      //   // for (let i = 0; i < 3; i++) {
      //   //   delete result[i];
      //   // }
      //   resolve(result)
      // })
    })
  }

}

module.exports = a;
