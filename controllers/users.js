const knex = require("../db/knex.js");

module.exports = {
  // CHANGE ME TO AN ACTUAL FUNCTION
  displaylogin: function(req, res) {
    res.render('login');
  },

  login: function(req, res) {
    let loginEmail = req.body.email;
    let loginUsername = req.body.user_name;
    let loginPassword = req.body.password;

    knex('users').where('email', req.body.email)
      .then((results) => {
        if (!results[0]) {
          res.redirect('/login');
        }
        if (results[0].password == req.body.password) {
          req.session.user.push(results[0]);
          req.session.save(() => {
            res.redirect('/board_list')
          });

        } else {
          res.redirect('/login');
        }
      })


  },

  admin_login: function(req, res){
    if(!req.session.admin){
      req.session.admin = []
    }
    res.render('admin_login')
  },

  admin_auth: function(req, res) {
    let loginEmail = req.body.email;
    let loginUsername = req.body.user_name;
    let loginPassword = req.body.password;
    knex('users').where('email', req.body.email)
      .then((results) => {
        if (!results[0]) {
          res.redirect('/login');
        }
        if (results[0].is_admin == true && results[0].password == req.body.password){

          req.session.user.push(results[0]);
          req.session.admin.push(results[0]);
          req.session.save(() => {
            res.redirect('/admin_page')
          });

        } else {
          res.redirect('/login');
        }
      })


  },

  displayregister: function(req, res) {
    res.render('register');
  },

  register: function(req, res) {
    knex('users').insert({
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect('/login')
      })
  },

  logout: function(req, res) {
    req.session.user = []
    res.redirect('/');

  },

  admin_logout: function(req, res){
    req.session.user = []
    req.session.admin = []
    res.redirect('/');
  },
}
