var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

/******************************** 
* 
*********************************/
router.get('/', function(req, res, next) {
    res.send('respond with a resource-1234');
});
/******************************** 
* 
*********************************/
router.get('/index', function(req, res) {
    var db = req.db;
    var collection = db.get('todos');
    var items = [];
    //    collection.find({},{},function(e,docs){
    collection.find({},{sort: {up_date: -1}},function(e,docs){
        docs.forEach( function (item) {
            items.push(item);
        });
        var param = {"docs": items };
        res.json(param);
    });
});
/******************************** 
* 
*********************************/
router.post('/new', (req, res) => {
    console.log(req.body.title )
    var db = req.db;
    var obj = req.body;
    obj.up_date = new Date();
    var collection = db.get('todos');
    collection.insert(obj , function(err, result ) {
        if (err) throw err;
        res.json(req.body);
        db.close();
    });        
});
/******************************** 
* 
*********************************/
router.get('/show/:id', function(req, res) {
    var db = req.db;
    console.log(req.params.id  );
    var collection = db.get('todos');
    //    res.send("1");
    collection.find({"_id": new ObjectID(req.params.id)},{},function(e,docs){
        var param = {"docs": docs };
        res.json(param);
    });
});
/******************************** 
* update
*********************************/
router.post('/update', (req, res) => {
  var db = req.db;
  console.log(req.body )
//        var obj = req.body;
  var obj = { "title": req.body.title ,
              "content": req.body.content,
              "complete": req.body.complete,
              "up_date" : new Date()
              };
  var collection = db.get('todos');
  collection.findOneAndUpdate( { _id: new ObjectID( req.body.id ) }, obj, {}, function(err, r){
      if (err) throw err;
      res.json(req.body);
      db.close();
  });        
});
/******************************** 
* delete
*********************************/
router.get('/delete/:id', function(req, res) {
  var db = req.db;
  console.log(req.params.id  );
  var collection = db.get('todos');
  collection.findOneAndDelete( { _id: new ObjectID( req.params.id ) }, {}, function(err, r){
      //console.log("#doc");
      res.json(r);
  });
});

module.exports = router;
