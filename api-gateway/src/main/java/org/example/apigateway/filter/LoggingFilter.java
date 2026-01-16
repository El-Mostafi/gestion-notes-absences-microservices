package org.example.apigateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;


@Component
public class LoggingFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getPath().value();
        String method = exchange.getRequest().getMethod().toString();

        System.out.println("========================================");
        System.out.println("Gateway Request:");
        System.out.println("Time: " + LocalDateTime.now());
        System.out.println("Method: " + method);
        System.out.println("Path: " + path);
        System.out.println("========================================");

        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            System.out.println("Response Status: " + exchange.getResponse().getStatusCode());
        }));
    }

    @Override
    public int getOrder() {
        return -1; // Exécuté en premier
    }
}

