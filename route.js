const  express = require('express');
const router=express.Router();
const Contact= require('../models/contacts');
const Notepad= require('../models/notepad');


router.get('/contacts',(req,res, next)=>{
    // res.send("retrieving the list");
    Contact.find(function(err,contacts){
        res.json(contacts);

    })
});





router.post('/form_data', function (req, res){
    console.log("CheckdataComingorNot : " , req.headers.entry);

    Notepad.create({notes:req.headers.entry}, function (err, data) {
        if (err) {
            console.log("err",err);
        }else {
            console.log('data', data);
            res.send({success: true, mydata: data});
        }
    })
})







router.get('/getdata', function (req, res){
    Notepad.find({},function (err, response) {
        if (err) throw err;
        res.setHeader('Content-Type',  'application/json');
        res.json({data: response});
    });
});

    

router.post('/contact',(req,res, next)=>{
    // "logic to add contact"
    let newContact=new Contact({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        phone: req.body.phone

    });
    newContact.save((err,contact)=>{
        if(err)
        {
            res.json({msg:"Failed to add Contact"})
        }else {
            res.json({msg:"contact added successfully"})

        }

    })
});


$scope.dataUpdate = function () {
    console.log("response");
    $http({
        method : "Update",
          url : 'http://localhost:3000/updatedata'
      }).then(function mySuccess(response) {
        $scope.data = response.data.data;
        console.log(response);

      }, function myError(err) {
          console.log(err);
      });
};





router.delete('/deleteData', function (req, res) {
    console.log("idddddddddd", req.headers.id);
    // mydb.collection("formTest").deleteOne({ _id: req.headers.id }, function (err, obj) {
    //     if (err) throw err;
    //     console.log("deleteed Data",obj);
    //     res.send({ success: "deleted" });


    // });

    Notepad.deleteOne({ _id: req.headers.id },function (err, response) {
        if (err) throw err;
        else {
            console.log("data",response);
            res.setHeader('Content-Type', 'application/json');
            res.json({ data: response });
        }
    })
    // mydb.collection('formTest').deleteO({_id:req.headers.id}).toArray(function (err, response) {
    //     if (err) throw err;
    //     console.log("response", response);

    //     res.setHeader('Content-Type', 'application/json');
    //     res.json({ data: response });


    // });

});


router.delete('/contact/:id',(req,res, next)=>{
    // "logic to add contact"
    Contact.remove({_id:req.params.id},(err,result)=>{
        if(err)
        {
            res.json({msg:"Failed to remove Contact"})
        }else {
            res.json({msg:"contact removed successfully"})

        }
    })
});


module.exports=router;
