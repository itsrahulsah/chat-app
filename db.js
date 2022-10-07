const mongoose  = require('mongoose')

mongoose.connect("mongodb+srv://superadmin342:mBPkqXVGvnJd6PiQ@codingsick.arupl2i.mongodb.net/chat",(err)=>{
    if(err){
        console.log(err);
        return
    }
    console.log('Connected to database');
})