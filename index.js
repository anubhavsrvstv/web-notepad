var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var cors = require('cors')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const port = process.env.PORT||8880;
const mongoose = require('mongoose');
app.use(cors());

mongoose.connect('mongodb+srv://anubhav:1234567890@cluster0-7pma8.gcp.mongodb.net/test?retryWrites=true&w=majority', function (err, db) {

    if (err) {
        console.log("error", err);
    }
    else {
        console.log("connected")
        mydb = db;
    }
});


app.use(express.static('.'));

app.get('/', function (req, res) {
    res.send('WEB NOTEPAD!');
});

app.get('/register', function (req, res) {
    console.log("form print")
    res.sendFile(__dirname + '/notepad.html');
});

app.post('/form_data', function (req, res) {
    console.log("abhi");
    console.log("req", req.body);
    mydb.collection('formTest').insertOne(req.body, function (err, data) {
        if (err) throw err;
        console.log('data', data);
        // res.sendFile(__dirname + '/note.html',data);
        res.send({ success: true, mydata: data });
    })
});

// /app.get('/home', function (req, res) {
// var myobj = {name: "ram",age:26};
// mydb.collection('hello').insertOne(myobj,function(err,data){
// if (err) throw err;
// res.send({success:true,mydata:data});

// })

// });

app.get('/getData', function (req, res) {
    mydb.collection('formTest').find({}).toArray(function (err, response) {
        if (err) throw err;
        // console.log("response", response);S

        res.setHeader('Content-Type', 'application/json');
        res.json({ data: response });


    });
});





app.get('/updateData', function (req, res) {
    mydb.collection("formTest").update({ comment: "Siddharth Srivastava" }, { comment: "Anubhav" }, function (err, obj) {
        if (err) throw err;
        console.log(obj);
        res.setHeader('Content-Type', 'application/json');
        res.send({ success: "true" });








    })

});






app.get('/deleteName',function(req,res){
    console.log("mydb",mydb.name);
    mydb.collection('formTest').find({},function(err,response){
        if(err) throw err;
        else{
            console.log("res",response);
            res.send({status:"success"});
        }
    })
})

app.post('/deleteData', function (req, res) {
    console.log("idddddddddd", req.headers.id);
    // mydb.collection("formTest").deleteOne({ _id: req.headers.id }, function (err, obj) {
    //     if (err) throw err;
    //     console.log("deleteed Data",obj);
    //     res.send({ success: "deleted" });


    // });

    mydb.collection('formTest').deleteOne({ _id: "5d7235f8249f531d80641ba0" },function (err, response) {
        if (err) throw err;
        else {
            console.log("data",data);
            res.setHeader('Content-Type', 'application/json');
            res.json({ data: data });
        }
    })
    // mydb.collection('formTest').deleteO({_id:req.headers.id}).toArray(function (err, response) {
    //     if (err) throw err;
    //     console.log("response", response);

    //     res.setHeader('Content-Type', 'application/json');
    //     res.json({ data: response });


    // });

});




var server = app.listen(port, function () {
    console.log("server started on port....." + port);
});

