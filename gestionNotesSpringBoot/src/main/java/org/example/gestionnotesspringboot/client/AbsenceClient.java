package org.example.gestionnotesspringboot.client;

import org.example.gestionnotesspringboot.dto.AbsenceDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

/**
 * Client Feign pour communiquer avec le service Gestion Absence
 * 
 * @FeignClient specifie:
 * - name: le nom du service dans Eureka (gestion-absence-service)
 * - Le client utilisera Eureka pour découvrir l'adresse du service
 */
@FeignClient(name = "gestion-absence-service")
public interface AbsenceClient {
    
    /**
     * Récupère toutes les absences d'un étudiant
     * Appelle: GET http://gestion-absence-service/api/absences/etudiant/{etudiantId}
     */
    @GetMapping("/api/absences/etudiant/{etudiantId}")
    List<AbsenceDTO> getAbsencesByEtudiantId(@PathVariable("etudiantId") Long etudiantId);
    
    /**
     * Compte le nombre d'absences d'un étudiant
     * Appelle: GET http://gestion-absence-service/api/absences/etudiant/{etudiantId}/count
     */
    @GetMapping("/api/absences/etudiant/{etudiantId}/count")
    Long countAbsencesEtudiant(@PathVariable("etudiantId") Long etudiantId);
    
    /**
     * Vérifie si un étudiant est dans la liste noire (trop d'absences)
     * Appelle: GET http://gestion-absence-service/api/absences/etudiant/{etudiantId}/liste-noire
     */
    @GetMapping("/api/absences/etudiant/{etudiantId}/liste-noire")
    Boolean isEtudiantListeNoire(@PathVariable("etudiantId") Long etudiantId);

    /**
     * Récupère le taux d'absence d'un étudiant (pour calcul de la note finale)
     * Appelle: GET http://gestion-absence-service/api/absences/etudiant/{etudiantId}/taux
     */
    @GetMapping("/api/absences/etudiant/{etudiantId}/taux")
    Double getTauxAbsence(@PathVariable("etudiantId") Long etudiantId);
}

