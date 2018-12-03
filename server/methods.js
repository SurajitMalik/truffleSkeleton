const
  A = require("../models/A"),
  A_Ins = new A();


module.exports = {

  "modifyB_name": function (id, name, done) {
    A_Ins.modifyB_name(id, name)
      .asCallback(done);
  },

  "getB": function (id, done) {
    A_Ins.getB(id)
      .asCallback(done);
  }

}
