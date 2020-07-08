var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource-1234');
});

router.get('/user_list', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        console.log(docs );
//        var param = {"docs": docs };
        var data = [{
            d1 : "data-1",
        }]
        var param = {"docs": data };
        res.json( param );
    });
});
/* tasks */
router.get('/tasks_index', function(req, res) {
    var db = req.db;
    var collection = db.get('tasks');
    var items = [];
    collection.find({},{},function(e,docs){
        docs.forEach( function (item) {
            items.push(item);
        });
        /*
        var data = [{
            d1 : "data-1",
        }]
        */
//        var param = {"docs": data };
        var param = {"docs": items };
        res.json(param);
    });
});

router.post('/tasks_new', (req, res) => {
    console.log(req.body.title )
    var db = req.db;
    var obj = req.body;
    var collection = db.get('tasks');
    collection.insert(obj , function(err, result ) {
        if (err) throw err;
        res.json(req.body);
        db.close();
    });        
}); 

router.get('/tasks_show/:id', function(req, res) {
    var db = req.db;
    console.log(req.params.id  );
    var collection = db.get('tasks');
//    res.send("1");
    collection.find({"_id": new ObjectID(req.params.id)},{},function(e,docs){
        var param = {"docs": docs };
        res.json(param);
    });
    /*
    */
});

//update
router.post('/tasks_update', (req, res) => {
    var db = req.db;
    console.log(req.body )
//        var obj = req.body;
    var obj = { "title": req.body.title ,
                "content": req.body.content
                };
    var collection = db.get('tasks');
    collection.findOneAndUpdate( { _id: new ObjectID( req.body.id ) }, obj, {}, function(err, r){
        if (err) throw err;
        res.json(req.body);
        db.close();
    });        
});
//delete
router.get('/tasks_delete/:id', function(req, res) {
    var db = req.db;
    console.log(req.params.id  );
    var collection = db.get('tasks');
    collection.findOneAndDelete( { _id: new ObjectID( req.params.id ) }, {}, function(err, r){
        //console.log("#doc");
        res.json(r);
    });
});

router.get('/tasks_test', function(req, res) {
    var db = req.db;
    var items = [{
        p1 : "data1",
    } ];
    var param = {"docs": items };
    res.json(param);
});


module.exports = router;
