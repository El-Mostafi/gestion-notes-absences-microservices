package org.example.gestionabsencespringboot.service;

import org.example.gestionabsencespringboot.client.NotesClient;
import org.example.gestionabsencespringboot.dto.NoteDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service exemple pour démontrer l'utilisation du client Feign
 * Ce service peut récupérer les notes d'un étudiant depuis le service Gestion Notes
 */
@Service
public class EtudiantInfoService {

    @Autowired
    private NotesClient notesClient;

    /**
     * Récupère les informations complètes d'un étudiant
     * en combinant les données locales et les notes du service distant
     */
    public Map<String, Object> getEtudiantCompletInfo(Long etudiantId) {
        Map<String, Object> info = new HashMap<>();

        try {
            // Récupérer les notes depuis le service Gestion Notes via Feign
            List<NoteDTO> notes = notesClient.getNotesByEtudiantId(etudiantId);
            Double moyenne = notesClient.getMoyenneEtudiant(etudiantId);

            info.put("etudiantId", etudiantId);
            info.put("notes", notes);
            info.put("moyenne", moyenne);
            info.put("nombreNotes", notes != null ? notes.size() : 0);
            info.put("source", "Service Gestion Notes (via Feign)");

        } catch (Exception e) {
            info.put("error", "Impossible de récupérer les notes: " + e.getMessage());
            info.put("etudiantId", etudiantId);
        }

        return info;
    }

    /**
     * Vérifie si un étudiant peut passer les examens
     * basé sur ses notes et absences
     */
    public Map<String, Object> verifierEligibiliteExamen(Long etudiantId) {
        Map<String, Object> result = new HashMap<>();

        try {
            Double moyenne = notesClient.getMoyenneEtudiant(etudiantId);

            result.put("etudiantId", etudiantId);
            result.put("moyenne", moyenne);

            if (moyenne != null && moyenne >= 10.0) {
                result.put("eligible", true);
                result.put("message", "Etudiant éligible pour les examens");
            } else {
                result.put("eligible", false);
                result.put("message", "Moyenne insuffisante");
            }

        } catch (Exception e) {
            result.put("error", "Erreur lors de la vérification: " + e.getMessage());
            result.put("eligible", false);
        }

        return result;
    }
}

