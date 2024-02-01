FROM openjdk:17

COPY target/out/artifacts/documentation_jar/documentation.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]