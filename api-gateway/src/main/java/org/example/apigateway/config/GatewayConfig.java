package org.example.apigateway.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

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

    /**
     * Configuration globale du CORS pour le Gateway.
     * Cela remplace la configuration dans les microservices individuels.
     */
    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration corsConfig = new CorsConfiguration();

        // Allow your frontend origin (React/Vite)
        corsConfig.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));


        // Allow all HTTP methods (GET, POST, PUT, DELETE, OPTIONS)
        corsConfig.setMaxAge(3600L);
        corsConfig.addAllowedMethod("*");

        // Allow all headers
        corsConfig.addAllowedHeader("*");

        // Allow credentials (cookies, authorization headers)
        corsConfig.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);

        return new CorsWebFilter(source);
    }
}