const
  fs = require('fs'),
  ethereumJsWallet = require('ethereumjs-wallet');

if (fs.existsSync("secret.json")) {
  secret = JSON.parse(fs.readFileSync('secret.json'), utf8);
  privateKey = secret.privateKey;
  wallet = ethereumJsWallet.fromPrivateKey(new Buffer(privateKey, 'hex'));
  address = wallet.getAddress().toString('hex');
  console.log('YOUR ETHERUM ADDRESS.....', address)
}else{
  console.log('NO SECRET FILE FOUND PLEASE TRY WITH TESTRPC')
}