package org.example.apigateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration des routes du Gateway (alternative au fichier properties)
 * Cette classe permet de définir les routes de manière programmatique
 */
@Configuration
public class GatewayConfig {


    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("gestion-absence-route", r -> r
                        .path("/absence/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://gestion-absence-service"))

                .route("gestion-notes-route", r -> r
                        .path("/notes/**")
                        .filters(f -> f.stripPrefix(1))
                        .uri("lb://gestion-notes-service"))

                .build();
    }
}

