var express = require('express');
var router = express.Router();
const db = require('../config/db');
const { joiApplicationInsert, joiApplicationUpdate } = require('../joiSchemas/joiApplication');

// application : GET ALL route
router.get('/get',(req,res) => {
  //where Organization_ID clause needs to be added
  db.query('SELECT * from application',(err,rows) => {
    if(err) throw err;

    console.log(rows)
    res.status(200).send(rows);
  })
})

// application : POST route
router.post('/post',(req,res) => {
  const { error, value } = joiApplicationInsert.validate(req.body);
  console.log('Value from Joi',value);
  if(error){
    console.log(error);
    return res.status(403).send(error);
  } else {
    db.query('INSERT INTO application SET ?',req.body,(err,result) => {
      if(err) throw err;
      
      console.log('Last Inserted Record : ',result.insertId)
      return res.status(200).send(`Appication_ID : ${result.insertId} Record Inserted`)
    })
  }
})

// application : UPDATE route
router.put('/update/:id', (req,res) => {
  const { error, value } = joiApplicationUpdate.validate(req.body);
  console.log('Value from Joi',value);
  if(error){
    console.log(error);
    return res.status(403).send(error);
  } else {
    db.query('UPDATE application SET ? Where Application_ID = ?',[req.body,req.params.id],(err,result) => {
      if (err) throw err;

      console.log(`Changed ${result.changedRows} row(s)`);
      return res.status(200).json({
        msg:`Changed ${result.changedRows} row(s)`,
        updated: true
      });
    })
  }
})

router.delete('/delete/:id',(req,res) => {
  db.query('DELETE from application Where Application_ID = ?',[req.params.id],(err,result) => {
    if (err){
      console.log(err)
      return res.status(400).send(err)
    };

    return res.status(200).json({
      msg:`Application_ID : ${req.params.id} Deleted`,
      deleted: true
    });
  })
})

module.exports = router;
