# Dockerfile for API Gateway
ENTRYPOINT ["java", "-jar", "app.jar"]
# Run the application

  CMD wget --no-verbose --tries=1 --spider http://localhost:8079/actuator/health || exit 1
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
# Health check

EXPOSE 8079
# Expose Gateway port

COPY --from=build /app/target/*.jar app.jar
# Copy the built jar

WORKDIR /app

FROM eclipse-temurin:17-jre-alpine
# Runtime stage

RUN ./mvnw package -DskipTests
# Build the application

COPY src src
# Copy source code

RUN chmod +x mvnw && ./mvnw dependency:go-offline -B
# Download dependencies

COPY pom.xml .
COPY .mvn .mvn
COPY mvnw.cmd .
COPY mvnw .
# Copy Maven wrapper and pom.xml

WORKDIR /app

FROM eclipse-temurin:17-jdk-alpine AS build
