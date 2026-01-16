package org.example.gestionabsencespringboot.client;

import org.example.gestionabsencespringboot.dto.NoteDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

/**
 * Client Feign pour communiquer avec le service Gestion Notes
 *
 * @FeignClient specifie:
 * - name: le nom du service dans Eureka (gestion-notes-service)
 * - Le client utilisera Eureka pour découvrir l'adresse du service
 */
@FeignClient(name = "gestion-notes-service")
public interface NotesClient {

    /**
     * Récupère toutes les notes d'un étudiant
     * Appelle: GET http://gestion-notes-service/api/notes/etudiant/{etudiantId}
     */
    @GetMapping("/api/notes/etudiant/{etudiantId}")
    List<NoteDTO> getNotesByEtudiantId(@PathVariable("etudiantId") Long etudiantId);

    /**
     * Calcule la moyenne d'un étudiant
     * Appelle: GET http://gestion-notes-service/api/notes/etudiant/{etudiantId}/moyenne
     */
    @GetMapping("/api/notes/etudiant/{etudiantId}/moyenne")
    Double getMoyenneEtudiant(@PathVariable("etudiantId") Long etudiantId);
}

