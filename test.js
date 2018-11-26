const jayson = require('jayson');

let contracts = jayson.client.tcp({
  host: "localhost",
  port: 2718
});

let id = "a1";

contracts.request("getB", [id], (err, reply) => {
  console.log('**** reply', reply);
})
