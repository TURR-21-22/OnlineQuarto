import { socket,chat_display,initChat,outputMessage,displayChatHistory } from '/js/quarto/widgets/chat.js'

$( document ).ready( INIT() );

function INIT() {
    initChat();

   /* 
    var $wrapper = $('.game-playfield-container');
    var wrapperWidth = $wrapper.width();
    var wrapperHeight = $wrapper.height();
    var $target = $('.game-playfield ');

    $(window).resize(function() {
        wrapperWidth = $wrapper.width();
        wrapperHeight = $wrapper.height();
        if ($wrapper.width() > $wrapper.height()) {
            $target.width( $wrapper.height());
        } else {
            $target.height($wrapper.width());
        }
    });
    */


    socket.emit(`joinToGame`);
    socket.on("connect", () => {
        const userDisplay = document.querySelector('#socket');
        userDisplay.innerHTML = socket.id;
    });
    socket.on("disconnect", () => {
        console.log(socket.id); // undefined
    });
    socket.on(`joinedToGame`, (msg)=>{
        if (msg !== "") {
            outputMessage(msg,chat_display);    
        }
    });
}

