class ChatEngine{
    constructor(chatBoxId, userEmail,userAccountHolder){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;
        this.userAccountHolder=userAccountHolder;
        // this.socket = io.connect('http://3.112.234.159:8001');
        this.socket = io.connect('http://localhost:5000');

        if (this.userEmail){
            this.connectionHandler();
         
        }
            
    }


    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log('connection established using sockets...!');
            console.log('hi fff');


            self.socket.emit('join_room', {
                user_email: self.userEmail,
                chatroom: 'codeial',
                user_accountHolder: self.userAccountHolder
            });

            self.socket.on('user_joined', function(data){
                console.log('a user joined!', data);
            })


        });

        // CHANGE :: send a message on clicking the send message button
        $('#send-message').click(function(){
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial',
                    user_accountHolder: self.userAccountHolder
                });
                $('#chat-message-input').val('');
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            // newMessage.append($('<sub>', {
            //     'html': data.user_email
            // })); // currently onhold only showing name
            newMessage.append($('<sub>', {
                'html': '&nbsp By-: &nbsp'
            }));
            newMessage.append($('<sub>', {
                'html': data.user_accountHolder
            }));
            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }
}
