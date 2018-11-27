const
  A = require("../models/A"),
  A_Ins = new A();


module.exports = {

  "modifyB_name": function (bIdName, done) {
    A_Ins.modifyB_name(bIdName.id, bIdName.Name)
      .asCallback(done);
  },

  "getB": function (id, done) {
    A_Ins.getB(id)
      .asCallback(done);
  }

}