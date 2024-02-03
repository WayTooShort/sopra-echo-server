'use strict';

var usernamePage = document.querySelector('#username-page');
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

// var stompClient = null;
var username = null;
var ws = null;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

function connect(event) {
    username = document.querySelector('#name').value.trim();

    if(username) {
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');
        connectingElement.classList.remove('hidden');

        ws = new WebSocket('ws://localhost:8080/chat');

        ws.onmessage = (data) => onMessageReceived(data);
        ws.onopen = () => onConnected();
        ws.onerror = () => onError();
        ws.onclose = () => onClose();

        // connectingElement.classList.add('hidden');

    }
    event.preventDefault()
}


function onConnected() {
    connectingElement.classList.add('hidden');

    let joinMessage = {
        sender: username,
        content: username,
        type: 'JOIN'
    };

    // ws.send(JSON.stringify(joinMessage));
}


function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}

function onClose() {
    let leaveMessage = {
        sender: username,
        content: username,
        type: 'LEAVE'
    };

    // ws.send(JSON.stringify(leaveMessage));

    while(messageArea.firstChild != null) {
        messageArea.removeChild(messageArea.lastChild)
    }

    usernamePage.classList.remove('hidden');
    chatPage.classList.add('hidden');
}

function sendMessage(event) {
    let messageContent = messageInput.value.trim();

    if(messageContent) {
        let chatMessage = {
            sender: username,
            content: messageContent,
            type: 'CHAT'
        };
        // console.log(JSON.stringify(chatMessage));
        // console.log(JSON.stringify(messageContent))
        // console.log("mc " + messageContent)
        ws.send(messageContent);
        messageInput.value = '';
    }

    event.preventDefault();
}


function onMessageReceived(payload) {
    let message = JSON.parse(payload.data);
    let messageElement = document.createElement('li');

    // if(message.type === 'JOIN') {
    //     messageElement.classList.add('event-message');
    //     message.content = message.sender + ' joined!';
    // } else if (message.type === 'LEAVE') {
    //     messageElement.classList.add('event-message');
    //     message.content = message.sender + ' left!';
    // } else {
    //     messageElement.classList.add('chat-message');
    //
    //     let avatarElement = document.createElement('i');
    //     let avatarText = document.createTextNode(message.sender[0]);
    //     avatarElement.appendChild(avatarText);
    //     avatarElement.style['background-color'] = getAvatarColor(message.sender);
    //
    //     messageElement.appendChild(avatarElement);
    //
    //     let usernameElement = document.createElement('span');
    //     let usernameText = document.createTextNode(message.sender);
    //     usernameElement.appendChild(usernameText);
    //     messageElement.appendChild(usernameElement);
    // }

        messageElement.classList.add('chat-message');

        let avatarElement = document.createElement('i');
        let avatarText = document.createTextNode("server");
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor("server"[0]);

        messageElement.appendChild(avatarElement);

        let usernameElement = document.createElement('span');
        let usernameText = document.createTextNode("server");
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);

    let textElement = document.createElement('p');
    let messageText = document.createTextNode(JSON.stringify(message));
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}


function getAvatarColor(messageSender) {
    let hash = 0;
    for (let i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    let index = Math.abs(hash % colors.length);
    return colors[index];
}

usernameForm.addEventListener('submit', connect, true)
messageForm.addEventListener('submit', sendMessage, true)
