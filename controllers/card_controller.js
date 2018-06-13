const knex = require("../db/knex.js");

module.exports = {

  cards: function(req, res){

  },

  create_card: function(req, res){

    knex('cards')
    .where('card_id', req.params.id)
    .insert({
      card_name: req.body.card_name,
      parent_column_id: req.params.parent_column_id,
      content: 'Add your content here!'
    })
    .then((results)=>{
        res.redirect('back')
      //res.redirect(`/board/${req.params.board_id}`)
    })
    .catch((error)=>{
        console.log('error:', error);
        res.send('ERRRRRORRR', error);
    })
  },

    edit_card: function(req, res){
      knex('cards')
      .where('card_id', req.params.id)
      .update({
        card_name: req.body.card_name,
        content: req.body.content
      })
      .then((results)=>{
          res.redirect('back')
      })
      .catch((error)=>{
          console.log('error:', error);
          res.send('ERRRRRORRR', error);
      })
    },

    delete_card: function(req, res){
      knex('cards')
      .where('card_id', req.params.card_id)
      .del()
      .then((result)=>{
          res.redirect('back')
      })
      .catch((error)=>{
          console.log('error:', error);
          res.send('ERRRRRORRR', error);
      })
    },

}
