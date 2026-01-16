package org.example.apigateway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
public class GatewayInfoController {

    @Autowired
    private DiscoveryClient discoveryClient;

    @GetMapping("/")
    public Map<String, Object> home() {
        Map<String, Object> response = new HashMap<>();
        response.put("service", "API Gateway");
        response.put("status", "UP");
        response.put("message", "API Gateway fonctionne correctement");
        response.put("routes", Map.of(
            "/absence/**", "gestion-absence-service",
            "/notes/**", "gestion-notes-service"
        ));
        return response;
    }

    @GetMapping("/services")
    public Map<String, Object> getServices() {
        Map<String, Object> response = new HashMap<>();
        List<String> services = discoveryClient.getServices();

        Map<String, List<ServiceInstance>> serviceDetails = new HashMap<>();
        for (String service : services) {
            List<ServiceInstance> instances = discoveryClient.getInstances(service);
            serviceDetails.put(service, instances);
        }

        response.put("services", services);
        response.put("serviceDetails", serviceDetails);
        response.put("totalServices", services.size());

        return response;
    }
}

