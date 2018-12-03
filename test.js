const jayson = require('jayson');


let contracts = jayson.client.tcp({
  host: "localhost",
  port: 2718
});

module.exports = {

  modifyB_name: function (_id, _name) {
    console.log(`id: ${_id} and name ${_name}`);
    contracts.request("modifyB_name", [_id, _name], (err, reply) => {
      console.log("**** reply", reply);
    })
  },

  getB: function (_id) {
    contracts.request("getB", [_id], (err, reply) => {
      console.log("**** reply", reply);
    })
  }
}

require('make-runnable');

// let bIdName = {
//   id: "a1",
//   Name: "Surajit Malik"
// };

// contracts.request("modifyB_name", [bIdName], (err, reply) => {
//   console.log('**** reply', reply);
// })

// let id = "a1";

// contracts.request("getB", [id], (err, reply) => {
//   console.log('**** reply', reply);
// })
