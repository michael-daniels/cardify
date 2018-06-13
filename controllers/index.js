const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  get: function(req, res) {

    // if(!req.session.user){
      req.session.user = [];
    //}
    req.session.save(()=>{
      res.render("index");
    })
  },
}
