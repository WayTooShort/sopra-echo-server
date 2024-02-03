package de.sopra.echoserver.config;

import com.google.gson.Gson;
import de.sopra.echoserver.entities.ChatMessage;
import de.sopra.echoserver.entities.MessageMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class SocketHandler extends TextWebSocketHandler {

    List<WebSocketSession> sessions = new CopyOnWriteArrayList<>();

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage rawMessage) throws InterruptedException, IOException {

        if(!session.isOpen()) return;

//        try {
//            MessageMessage message = new Gson().fromJson(rawMessage.getPayload(), MessageMessage.class);
//
//            session.sendMessage(rawMessage);
//        } catch () {
//            session.sendMessage();
//        }

//        ChatMessage message = new Gson().fromJson(rawMessage.getPayload(), ChatMessage.class);
        System.out.println(rawMessage);
        session.sendMessage(rawMessage);

//        switch (message.type) {
//            case CHAT -> broadcastMessage(message); //session.sendMessage(new TextMessage(new Gson().toJson(message)));
//            case JOIN -> broadcastMessage(message);
//            case LEAVE -> broadcastMessage(message);
//            default -> throw new IOException("Message Type unknown");
//        }
    }

    public void broadcastMessage(ChatMessage message) throws IOException {
        for(WebSocketSession webSocketSession : sessions) {
            webSocketSession.sendMessage(new TextMessage(new Gson().toJson(message)));
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        //the messages will be broadcasted to all users.
        sessions.add(session);
    }
}