// importing module

var express=require('express');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var cors=require('cors');
var path=require('path');

var app= express();

const route = require('./routes/route');

//connect to mongo db
mongoose.connect('mongodb+srv://anubhav:1234567890@cluster0-7pma8.gcp.mongodb.net/notepadDetails?retryWrites=true&w=majority');
//on connection

mongoose.connection.on('connected',()=>{
    console.log('Connected to Database')
})
mongoose.connection.on('error',(err)=>{
if(err){
    console.log('err',err);

}
    // console.log('Connected to Database')
})




const  port =process.env.PORT||3002;

app.use('/api',route);

//adding middleware

app.use(cors());

app.use(bodyparser.json());

//staticfile
app.use(express.static(path.join(__dirname ,'public')));

//testing
app.get('/',(req,res)=>{
    res.send('foobar');
})

app.listen(port,()=>{
    console.log('server started at port:'+ port)
});


