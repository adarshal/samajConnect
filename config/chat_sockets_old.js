
module.exports.chatSockets = function(socketServer){
   let io = require('socket.io')(socketServer);

   io.sockets.on('connection', function(socket){
       console.log('new connection received', socket.id);

       socket.on('disconnect', function(){
           console.log('socket disconnected!');
       });

       
       socket.on('join_room', function(data){
           console.log('joining request rec.', data);

           socket.join(data.chatroom); //data.chatroom(here name codeial) exists socket will join to it else it will crete it

           io.in(data.chatroom).emit('user_joined', data);//if you wanrt specf emit in part chat use like this io.in(name).emit
       })

      // detect send_message and broadcast to everyone in the room
       socket.on('send_message', function(data){
           io.in(data.chatroom).emit('receive_message', data);
       });

   });

}

