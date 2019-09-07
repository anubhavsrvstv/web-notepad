const  mongoose= require('mongoose');

const  NotepadSchema=mongoose.Schema({
    notes:{
        type:String,
        required:true
    }
});

const Notepad =module.exports= mongoose.model('notepad',NotepadSchema);
