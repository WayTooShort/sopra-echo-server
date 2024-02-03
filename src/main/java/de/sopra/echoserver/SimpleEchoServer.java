package de.sopra.echoserver;

import java.net.*;
import java.io.*;

public class SimpleEchoServer
{
    public static void main(String[] args)
    {
        try {
            System.out.println("Warte auf Verbindung auf Port 6000...");
            ServerSocket echod = new ServerSocket(6000);
            Socket socket = echod.accept();
            System.out.println("Verbindung hergestellt");
            InputStream in = socket.getInputStream();
            OutputStream out = socket.getOutputStream();
            int c;
            while ((c = in.read()) != -1) {
                out.write((char)c);
                System.out.print((char)c);
            }
//            System.out.println("Verbindung beenden");
//            socket.close();
//            echod.close();
        } catch (IOException e) {
            System.err.println(e.toString());
            System.exit(1);
        }
    }
}