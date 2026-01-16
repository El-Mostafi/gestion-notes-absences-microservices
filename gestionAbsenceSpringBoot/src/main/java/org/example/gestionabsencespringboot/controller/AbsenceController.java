package org.example.gestionabsencespringboot.controller;

import org.example.gestionabsencespringboot.entity.EtudiantAbsence;
import org.example.gestionabsencespringboot.service.AbsenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Contrôleur REST pour la gestion de l'absentéisme
 * Implémente toutes les opérations du cahier des charges
 */
@RestController
@RequestMapping("/api/absences")
@CrossOrigin(origins = "*")
public class AbsenceController {

    @Autowired
    private AbsenceService absenceService;

    /**
     * Add - Ajoute un nouvel étudiant avec ses informations d'absence
     * POST /api/absences/etudiant
     */
    @PostMapping("/etudiant")
    public ResponseEntity<EtudiantAbsence> add(@RequestBody EtudiantAbsence etudiant) {
        EtudiantAbsence saved = absenceService.add(etudiant);
        return ResponseEntity.ok(saved);
    }

    /**
     * Read - Retourne le taux d'absence d'un étudiant
     * GET /api/absences/etudiant/{id}/taux
     */
    @GetMapping("/etudiant/{id}/taux")
    public ResponseEntity<Double> read(@PathVariable Long id) {
        Double taux = absenceService.read(id);
        if (taux != null) {
            return ResponseEntity.ok(taux);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Update - Met à jour les informations d'un étudiant
     * PUT /api/absences/etudiant/{id}
     */
    @PutMapping("/etudiant/{id}")
    public ResponseEntity<EtudiantAbsence> update(@PathVariable Long id, @RequestBody EtudiantAbsence etudiant) {
        EtudiantAbsence updated = absenceService.update(id, etudiant);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Delete - Supprime un étudiant de la liste
     * DELETE /api/absences/etudiant/{id}
     */
    @DeleteMapping("/etudiant/{id}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable Long id) {
        boolean success = absenceService.delete(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        response.put("message", success ? "Étudiant supprimé" : "Étudiant non trouvé");
        return ResponseEntity.ok(response);
    }

    /**
     * BlackListCreate - Dresse la liste noire des étudiants
     * GET /api/absences/liste-noire?seuil=0.5
     * Seuil par défaut: 0.5 (50%)
     */
    @GetMapping("/liste-noire")
    public ResponseEntity<List<EtudiantAbsence>> blackListCreate(@RequestParam(required = false, defaultValue = "0.5") Double seuil) {
        List<EtudiantAbsence> listeNoire = absenceService.blackListCreate(seuil);
        return ResponseEntity.ok(listeNoire);
    }

    /**
     * Récupère tous les étudiants
     * GET /api/absences/etudiants
     */
    @GetMapping("/etudiants")
    public ResponseEntity<List<EtudiantAbsence>> getAllEtudiants() {
        List<EtudiantAbsence> etudiants = absenceService.getAllEtudiants();
        return ResponseEntity.ok(etudiants);
    }

    /**
     * Récupère un étudiant par ID
     * GET /api/absences/etudiant/{id}
     */
    @GetMapping("/etudiant/{id}")
    public ResponseEntity<EtudiantAbsence> getEtudiantById(@PathVariable Long id) {
        return absenceService.getEtudiantById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Récupère un étudiant par CNE
     * GET /api/absences/etudiant/cne/{cne}
     */
    @GetMapping("/etudiant/cne/{cne}")
    public ResponseEntity<EtudiantAbsence> getEtudiantByCne(@PathVariable String cne) {
        return absenceService.getEtudiantByCne(cne)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Récupère le taux d'absence par CNE
     * GET /api/absences/etudiant/cne/{cne}/taux
     */
    @GetMapping("/etudiant/cne/{cne}/taux")
    public ResponseEntity<Double> getTauxByCne(@PathVariable String cne) {
        Double taux = absenceService.getTauxAbsenceByCne(cne);
        if (taux != null) {
            return ResponseEntity.ok(taux);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Vérifie si un étudiant est dans la liste noire
     * GET /api/absences/etudiant/{id}/liste-noire?seuil=0.5
     */
    @GetMapping("/etudiant/{id}/liste-noire")
    public ResponseEntity<Boolean> isListeNoire(@PathVariable Long id, @RequestParam(required = false, defaultValue = "0.5") Double seuil) {
        return absenceService.getEtudiantById(id)
                .map(etudiant -> ResponseEntity.ok(etudiant.estListeNoire(seuil)))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Compte le nombre d'étudiants dans la liste noire
     * GET /api/absences/liste-noire/count?seuil=0.5
     */
    @GetMapping("/liste-noire/count")
    public ResponseEntity<Long> countListeNoire(@RequestParam(required = false, defaultValue = "0.5") Double seuil) {
        Long count = absenceService.countListeNoire(seuil);
        return ResponseEntity.ok(count);
    }

    /**
     * Récupère les informations détaillées d'un étudiant
     * GET /api/absences/etudiant/{id}/info
     */
    @GetMapping("/etudiant/{id}/info")
    public ResponseEntity<Map<String, Object>> getEtudiantInfo(@PathVariable Long id) {
        return absenceService.getEtudiantById(id)
                .map(etudiant -> {
                    Map<String, Object> info = new HashMap<>();
                    info.put("etudiant", etudiant);
                    info.put("tauxAbsence", etudiant.getTauxAbsence());
                    info.put("tauxAbsencePourcentage", etudiant.getTauxAbsencePourcentage());
                    info.put("listeNoire50", etudiant.estListeNoire(0.5));
                    return ResponseEntity.ok(info);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

