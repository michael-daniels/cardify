const knex = require("../db/knex.js");

module.exports = {

  columns: function(req, res){

  },

  create_column: function(req, res){
    knex('columns')
    .insert({
      board_id: req.body.board_id,
      column_name: req.body.column_name
    })
    .returning('column_id')
    .then((theData)=>{
    knex('cards')
    .insert({
      card_name: 'New Card',
      //will only work on first created object, need to fix this
      parent_column_id: theData[0],
      content: 'Add your content here!',
    })
    .then((results)=>{
      res.redirect(`/board/${req.body.board_id}`)
    })
  })
    .catch((error)=>{
        console.log('error:', error);
        res.sendStatus(500);
    })
  },

  edit_column: function(req, res){
    knex('columns')
    .where('column_id', req.params.column_id)
    .update({
      column_name: req.body.column_name,
    })
    .then((result)=>{
        res.redirect('back')
    })
    .catch((error)=>{
        console.log('error:', error);
        res.sendStatus(500);
    })
  },

  delete_column: function(req, res){
    knex('columns')
    .where('column_id', req.params.column_id)
    .del()
    .then((result)=>{
        res.redirect(`/board/${req.body.board_id}`)
    })
    .catch((error)=>{
        console.log('error:', error);
        res.sendStatus(500);
    })
  },
}
