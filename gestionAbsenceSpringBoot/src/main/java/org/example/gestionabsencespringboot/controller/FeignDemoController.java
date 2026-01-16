package org.example.gestionabsencespringboot.controller;

import org.example.gestionabsencespringboot.service.EtudiantInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * Contrôleur pour démontrer la communication inter-services avec Feign
 */
@RestController
@RequestMapping("/api/feign-demo")
public class FeignDemoController {
    
    @Autowired
    private EtudiantInfoService etudiantInfoService;
    
    /**
     * Endpoint de test pour vérifier que le service fonctionne
     * GET /api/feign-demo/test
     */
    @GetMapping("/test")
    public Map<String, Object> test() {
        return Map.of(
            "service", "Gestion Absence",
            "message", "Service opérationnel avec OpenFeign",
            "feignEnabled", true,
            "port", 8081
        );
    }
    
    /**
     * Récupère les informations complètes d'un étudiant
     * incluant ses notes du service distant
     * GET /api/feign-demo/etudiant/{id}/info
     */
    @GetMapping("/etudiant/{id}/info")
    public Map<String, Object> getEtudiantInfo(@PathVariable Long id) {
        return etudiantInfoService.getEtudiantCompletInfo(id);
    }
    
    /**
     * Vérifie l'éligibilité d'un étudiant pour les examens
     * GET /api/feign-demo/etudiant/{id}/eligibilite
     */
    @GetMapping("/etudiant/{id}/eligibilite")
    public Map<String, Object> verifierEligibilite(@PathVariable Long id) {
        return etudiantInfoService.verifierEligibiliteExamen(id);
    }
}

