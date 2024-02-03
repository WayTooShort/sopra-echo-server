package de.sopra.echoserver.entities;


public class MessageMessage {
    public String message;

    public MessageMessage(String message) {
        this.message = message;

    }

    @Override
    public String toString() {
        return "MessageMessage{" +
                "message='" + message + '\'' +
                '}';
    }
}
