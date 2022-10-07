require('./db')
const userSchema = require('./models/user')
const expess = require('express')



const app = expess()
const server = require('http').createServer(app)
const io  = require('socket.io')(server,{
    cros:{
        origins: "*",
    }
})

app.use('/',expess.static('public'))

io.on('connection', function(socket){
    //send & recieve messages
    socket.on('send-message',async(userMessage)=>{
        const reciever = await userSchema.findOne({email:userMessage.to})
        if(reciever){
            if(reciever.isOnline){
                io.to(reciever.socketId).emit('recieve-message',userMessage)
            }else{
                console.log(userMessage)
                reciever.messageQueue.push(userMessage)
                await reciever.save();
            }
        }
    })

    //join chat
    socket.on('join',async(pram)=>{
    const {email,name} = pram
    try{
        const user = await userSchema.findOne({email}).populate('messageQueue')
        if(user){
            user.socketId = socket.id
            user.lastOnline = new Date();
            user.isOnline = true,
            user.save()
        }else{
            const user = new userSchema({
                name,
                email,
                socketId : socket.id,
                lastOnline : Date.now(),
                isOnline : true
            })
            await user.save();
        }
        io.to(socket.id).emit('joined',user)
            // while(user.messageQueue.length>0){
            //     io.to(user.socketId).emit("recieve-message",user.messageQueue.pop())
            // }
        
    }catch(err){
        console.log(err.message)
    }

    })
    
    //disconncection
    socket.on('disconnect',async ()=>{
        const user = await userSchema.findOne({socketId : socket.id})
        if(user){
            user.socketId =''
            user.isOnline = false
            user.lastOnline = new Date
            await user.save()
        }
        
    })

});

//server listining
 server.listen(3000, function(){
    console.log('listening on *:3000');
 });


