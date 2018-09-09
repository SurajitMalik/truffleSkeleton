const
    SimpleSetGet = artifacts.require('simpleSetGet.sol'),
    fs = require('fs'),
    config = require('../config');

module.exports = function test(deployer) {
    deployer.deploy(SimpleSetGet)
        .then(() => {
            fs.writeFileSync(
                'contract.txt',
                `LIST OF CONTRACTS
                ${'-'.repeat(30)}
                SimpleSetGet: ${SimpleSetGet.address}`)
        })
}