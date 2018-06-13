const knex = require("../db/knex.js");

module.exports = {

  //NEEDS USER ID IN ROUTE (/:ID)
  boards: function(req, res){

    let userID = req.session.user

    knex('boards')
    // BAND-AID TO LOAD WITH TEST DATA, CHANGE FROM USER AT [0] ONCE WE CAN ADD BOARDS FROM INSIDE THE APP
      .where('owner_id', req.session.user[0].id)
      .then((result)=>{
        res.render('boards',{boardInfo:result, userID: userID})
      })
      .catch((error)=>{
        console.log(error);
        res.sendStatus(500);
      })
  },


// for a single board,
// query the database to get a list of columns
// once we have the columns, add each to a separate object in results array
// so data structure: [{column_id: 1, column_name, etc},{column_id: 2},{column_id: 3}]

// loop through all the columns in a board
// for each column, query the database to get all cards within column
// add cards to array in column object
// example
// [{column_id: 1, column_name: 'blach', cards: [database results for cards within column]},{column_id: 2},{column_id: 3}]
  single_board: function(req, res){

    let boardID = req.params.board_id;
    let newArray = [];

    knex('boards')
    .where('boards.board_id', req.params.board_id)
      .innerJoin('columns', 'boards.board_id', 'columns.board_id')
       .innerJoin('cards', 'columns.column_id', 'cards.parent_column_id')
      .then((result) =>{
        for (let i = 0; i < result.length; i++) {
            newArray.push({
              board_id:result[i].board_id,
              board_name:result[i].board_name,
              column_id:result[i].column_id,
              column_name:result[i].column_name,
              column_cards: [],
            })

            for (let j = 0; j < result.length; j++) {
              if (newArray[i].column_id === result[j].parent_column_id) {
                newArray[i].column_cards.push({
                  card_id: result[j].card_id,
                  card_name: result[j].card_name,
                  content: result[j].content,
                })
              }
            }

        }

        let finalObj = {};

        for (let i = 0; i < newArray.length; i++) {
          var columnID = newArray[i].column_id;
          if (!finalObj[columnID]) {
              finalObj[columnID] = newArray[i];
          }
        }

        var finalArray = [];
        for (key in finalObj){
          finalArray.push(finalObj[key]);
        }

          res.render('single_board', {
          boardInfo: finalArray, boardID: boardID

      })
    //   .catch((error)=>{
    //     console.log(error);
    //     res.sendStatus(500);
    //   })
     })
  },

  //PASS LIST OF CONTRIBUTORS FOR SINGLE BOARD
  //INNER JOIN THIS TO GET NAME OF CONTRUBUTOR ON FUTURE QUERRY
  contributors: function(req, res){
    res.render('single_board'/*,{}*/)
  },

  create_board: function(req, res){
    knex('boards')
      .insert({
        board_name:req.body.board_name,
        owner_id: req.session.user[0].id,
      })
      .returning('board_id')
      .then((data)=>{
        knex('columns')
        .insert({
          column_name: 'New Column',
          //will only work on first created object, need to fix this
          board_id: data[0]
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
          .then((result)=>{
          res.redirect('/board_list')
        })
      })
    })
      .catch((error)=>{
          console.log('error:', error);
          res.sendStatus(500);
      })
  },

  update_board: function(req, res){
    knex('boards')
    .where('board_id', req.params.board_id)
    .update({
      board_name: req.body.board_name,
    })
    .then((result)=>{
      console.log('BOARD ID', req.params.board_id)
      console.log(req.body.board_name)
      console.log('hit the update route')
        res.redirect('back')
    })
    .catch((error)=>{
        console.log('error:', error);
        res.sendStatus(500);
    })
  },

  delete_board: function(req, res){
    knex('boards')
    .where('board_id', req.params.board_id)
    .del()
    .then(()=>{
        res.redirect('/board_list')
    })
    .catch((error)=>{
        console.log('error:', error);
        res.sendStatus(500);
    })
  },

  add_contributor: function(req, res){
    knex('contributors')
    .where('board_id', req.body.board_id)
    .insert({
      user_id: req.body.user_id,
      board_id: req.body.board_id
    })
    .then((results)=>{
      res.render('single_board',{contributors:results})
    })
    .catch((error)=>{
        console.log('error:', error);
        res.sendStatus(500);
    })
  },
  remove_contributor: function(req, res){
    knex('contributors')
    .where('id', req.body.id)
    .del()
    .then((results)=>{
      res.render('single_board',{contributors:results})
    })
    .catch((error)=>{
        console.log('error:', error);
        res.sendStatus(500);
    })
},

}
