const
  A = require("../models/A"),
  A_Ins = new A();


module.exports = {

  "getB": function (id, done) {
    A_Ins.getB(id)
      .asCallback(done);
  }

}
