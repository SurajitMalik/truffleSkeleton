const
  A = artifacts.require('A.sol'),
  fs = require('fs'),
  Web3 = require("web3"),
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

module.exports = function test(deployer) {
  deployer.deploy(
    A,
    web3.fromAscii("a1"),
    web3.fromAscii("Surajit"),
    web3.fromAscii("Married")
  ).then(() => {
    fs.writeFileSync(
      './config/contracts.json', `{  
            "A":   "${A.address}"
          }`
    )
  })
}
