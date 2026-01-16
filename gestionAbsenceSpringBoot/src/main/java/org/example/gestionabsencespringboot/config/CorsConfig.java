package org.example.gestionabsencespringboot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;

/**
 * Configuration CORS pour permettre au client React (ou autre frontend)
 * de communiquer avec l'API REST
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        // Permettre les credentials (cookies, authorization headers, etc.)
        config.setAllowCredentials(true);

        // Origines autorisées (React tourne généralement sur le port 3000)
        config.setAllowedOrigins(Arrays.asList(
            "http://localhost:3000",
            "http://localhost:3001",
            "http://localhost:5173",
                "http://localhost:5174"    // Vite utilise le port 5173
        ));

        // Headers autorisés
        config.addAllowedHeader("*");

        // Méthodes HTTP autorisées
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Appliquer la configuration à tous les endpoints /api/**
        source.registerCorsConfiguration("/api/**", config);

        return new CorsFilter(source);
    }
}

