var express = require('express');
var app = express();
var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended:true}));
const port = process.env.PORT;
const mongoose = require('mongoose');
var mydb;

mongoose.connect( 'mongodb+srv://anubhav:1234567890@cluster0-7pma8.gcp.mongodb.net/test?retryWrites=true&w=majority',function(err,db){

   if (err){
        console.log("error",err);
    }
    else{
         mydb =db;
    }
} );


app.use(express.static('.')); 

app.get('/', function (req, res) {
    res.send('WEB NOTEPAD!');
});

app.get('/register', function (req, res) {
    console.log("form print")
    res.sendFile(__dirname + '/note.html');
});

app.post('/form_data', function (req, res) {
    console.log("abhi");
    console.log("req",req.body);
    mydb.collection('formTest').insertOne(req.body,function(err,data){
        if (err) throw err;
        console.log('data',data);
        // res.sendFile(__dirname + '/note.html',data);
        res.send({success:true,mydata:data});
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
        console.log("response", response);

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








app.delete('/deleteData', function (req, res) {
    mydb.collection("formTest").deleteOne({ name: "Anubhav" }, function (err, obj) {
        if (err) throw err;
        // console.log(obj.result.n + '/note.html');
        res.send({ success: "true" });


    });

});




var server = app.listen(port, function () {
    console.log("server started on port....."+port);
 });


