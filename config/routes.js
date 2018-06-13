//Update the name of the controller below and rename the file.
const index = require("../controllers/index.js");
const users = require("../controllers/users.js");
const board_controller = require("../controllers/board_controller.js");
const column_controller = require("../controllers/column_controller.js")
const card_controller = require("../controllers/card_controller.js")
const admin = require("../controllers/admin.js")

module.exports = function(app) {
  // LOGIN AND AUTHENICATION PATHS
  app.get('/', index.get);

  app.get('/login', users.displaylogin);

  app.post('/login', users.login);

  app.get('/logout', users.logout);

  app.get('/register', users.displayregister);

  app.post('/register', users.register);

  //admin login moved above blocking middleware
  app.get('/admin_login', users.admin_login);

  app.post('/admin', users.admin_auth);

  //Non user page blocking middleware
  app.use(authMiddleware);

  //BOARD CREATION AND EDITING
  app.get('/board_list', board_controller.boards);

  app.get('/board/:board_id', board_controller.single_board);

  app.get('/board/:id/contributors', board_controller.contributors);

  app.post('/create/board', board_controller.create_board);

  app.post('/board/delete/:board_id', board_controller.delete_board);

  app.post('/board/update/:board_id', board_controller.update_board);

  //COLUMN CREATION AND EDITING
  app.get('/columns', column_controller.columns);

  app.post('/create/column/', column_controller.create_column);

  app.post('/edit/column/:column_id', column_controller.edit_column);

  app.post('/delete/column/:column_id', column_controller.delete_column);

  //CARDS ROUTES

  app.get('/cards', card_controller.cards);

  app.post('/create/board/:board_id/column/:parent_column_id/card', card_controller.create_card);

  app.post('/edit/board/:board_id/card/:id', card_controller.edit_card);

  app.get('/delete/board/:board_id/card/:card_id', card_controller.delete_card);

  //ADMIN ROUTES





  app.use(authAdmin);

  app.get('/admin_page', admin.home_page);

  app.post('/delete/board/:id', admin.delete_board);

  app.get('/admin_logout', users.admin_logout);

}

function authAdmin(req, res, next){
  if(!req.session.admin[0]){
    res.redirect('/login')
  }else{
    next();
  }
}

function authMiddleware(req, res, next) {
  if (!req.session.user[0]) {
    res.redirect('/login')
  } else {
    next();
  }
}
