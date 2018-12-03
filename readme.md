# TO COMPILE
$ truffle compile

# TO DEPLOY WITH TRUFFLE
1. Open one terminal and run the following command:
$ truffle develop
2. Open another terminal and run the command
$ truffle migrate --network development

# TO DEPLOY WITH ROPSTEN TESTNET
$ truffle migrate --network ropsten

# TO DEPLOY AND TEST WITH TESTRPC
1. Mention one address and its private-key in "config/default.json". Then
$ truffle migrate --network testrpc
2. Open one terminal and run the following command to invoke contract methods:
$ node test.js modifyB_name a1 "Surajit Malik"
$ node test.js getB a1
