package jens.echoserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class EchoServerApplication extends SpringBootServletInitializer {

    private static Class applicationClass = EchoServerApplication.class;

    public static void main(String[] args) {
        SpringApplication.run(EchoServerApplication.class, args);
    }

}
