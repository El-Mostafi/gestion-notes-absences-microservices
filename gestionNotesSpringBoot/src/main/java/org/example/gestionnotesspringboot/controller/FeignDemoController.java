package org.example.gestionnotesspringboot.controller;

import org.example.gestionnotesspringboot.service.EtudiantAbsenceService;
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
    private EtudiantAbsenceService etudiantAbsenceService;

    /**
     * Endpoint de test pour vérifier que le service fonctionne
     * GET /api/feign-demo/test
     */
    @GetMapping("/test")
    public Map<String, Object> test() {
        return Map.of(
            "service", "Gestion Notes",
            "message", "Service opérationnel avec OpenFeign",
            "feignEnabled", true,
            "port", 8082
        );
    }

    /**
     * Récupère les informations d'absences d'un étudiant
     * depuis le service Gestion Absence
     * GET /api/feign-demo/etudiant/{id}/absences
     */
    @GetMapping("/etudiant/{id}/absences")
    public Map<String, Object> getEtudiantAbsences(@PathVariable Long id) {
        return etudiantAbsenceService.getEtudiantAbsenceInfo(id);
    }

    /**
     * Vérifie si un étudiant peut recevoir son relevé de notes
     * GET /api/feign-demo/etudiant/{id}/autorisation-releve
     */
    @GetMapping("/etudiant/{id}/autorisation-releve")
    public Map<String, Object> verifierAutorisationReleve(@PathVariable Long id) {
        return etudiantAbsenceService.verifierAutorisationReleve(id);
    }
}

