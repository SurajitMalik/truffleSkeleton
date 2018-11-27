const jayson = require('jayson');

let contracts = jayson.client.tcp({
  host: "localhost",
  port: 2718
});

let bIdName = {
  id: "a1",
  name: "Surajit Malik"
};

contracts.request("modifyB_name", [bIdName], (err, reply) => {
  console.log('**** reply', reply);
})

// let id = "a1";

// contracts.request("getB", [id], (err, reply) => {
//   console.log('**** reply', reply);
// })