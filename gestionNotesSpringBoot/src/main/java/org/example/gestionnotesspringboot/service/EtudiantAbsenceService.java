package org.example.gestionnotesspringboot.service;

import org.example.gestionnotesspringboot.client.AbsenceClient;
import org.example.gestionnotesspringboot.dto.AbsenceDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Service exemple pour démontrer l'utilisation du client Feign
 * Ce service peut récupérer les absences d'un étudiant depuis le service Gestion Absence
 */
@Service
public class EtudiantAbsenceService {

    @Autowired
    private AbsenceClient absenceClient;

    /**
     * Récupère les informations d'absences d'un étudiant
     */
    public Map<String, Object> getEtudiantAbsenceInfo(Long etudiantId) {
        Map<String, Object> info = new HashMap<>();

        try {
            // Récupérer les absences depuis le service Gestion Absence via Feign
            List<AbsenceDTO> absences = absenceClient.getAbsencesByEtudiantId(etudiantId);
            Long nombreAbsences = absenceClient.countAbsencesEtudiant(etudiantId);
            Boolean listeNoire = absenceClient.isEtudiantListeNoire(etudiantId);

            info.put("etudiantId", etudiantId);
            info.put("absences", absences);
            info.put("nombreAbsences", nombreAbsences);
            info.put("listeNoire", listeNoire);
            info.put("source", "Service Gestion Absence (via Feign)");

        } catch (Exception e) {
            info.put("error", "Impossible de récupérer les absences: " + e.getMessage());
            info.put("etudiantId", etudiantId);
        }

        return info;
    }

    /**
     * Détermine si un étudiant peut recevoir son relevé de notes
     * basé sur son taux d'absentéisme
     */
    public Map<String, Object> verifierAutorisationReleve(Long etudiantId) {
        Map<String, Object> result = new HashMap<>();

        try {
            Boolean listeNoire = absenceClient.isEtudiantListeNoire(etudiantId);
            Long nombreAbsences = absenceClient.countAbsencesEtudiant(etudiantId);

            result.put("etudiantId", etudiantId);
            result.put("nombreAbsences", nombreAbsences);
            result.put("listeNoire", listeNoire);

            if (!listeNoire) {
                result.put("autoriseReleve", true);
                result.put("message", "Etudiant autorisé à recevoir son relevé de notes");
            } else {
                result.put("autoriseReleve", false);
                result.put("message", "Trop d'absences - Relevé bloqué");
            }

        } catch (Exception e) {
            result.put("error", "Erreur lors de la vérification: " + e.getMessage());
            result.put("autoriseReleve", false);
        }

        return result;
    }
}

