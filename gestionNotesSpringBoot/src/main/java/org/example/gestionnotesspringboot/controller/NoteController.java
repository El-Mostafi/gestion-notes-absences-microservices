package org.example.gestionnotesspringboot.controller;

import org.example.gestionnotesspringboot.entity.Etudiant;
import org.example.gestionnotesspringboot.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Contrôleur REST pour la gestion des notes
 * Implémente toutes les opérations du cahier des charges
 */
@RestController
@RequestMapping("/api/notes")
@CrossOrigin(origins = "*")
public class NoteController {

    @Autowired
    private NoteService noteService;

    /**
     * Ajoute un nouvel étudiant
     * POST /api/notes/etudiant
     */
    @PostMapping("/etudiant")
    public ResponseEntity<Map<String, Object>> ajouterEtudiant(@RequestBody Etudiant etudiant) {
        boolean success = noteService.ajouterEtudiant(etudiant);
        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        response.put("message", success ? "Étudiant ajouté avec succès" : "Erreur lors de l'ajout");
        if (success) {
            response.put("etudiant", etudiant);
        }
        return ResponseEntity.ok(response);
    }

    /**
     * Récupère la note (moyenne) d'un étudiant par son nom
     * GET /api/notes/note/{nom}
     */
    @GetMapping("/note/{nom}")
    public ResponseEntity<Map<String, Object>> getNote(@PathVariable String nom) {
        Double note = noteService.getNote(nom);
        Map<String, Object> response = new HashMap<>();
        if (note != null) {
            response.put("nom", nom);
            response.put("note", note);
            response.put("valide", note >= 12.0);
        } else {
            response.put("error", "Étudiant non trouvé");
        }
        return ResponseEntity.ok(response);
    }

    /**
     * Récupère tous les étudiants qui ont validé le module
     * GET /api/notes/validant
     */
    @GetMapping("/validant")
    public ResponseEntity<List<Etudiant>> getEtudiantsValidant() {
        List<Etudiant> etudiants = noteService.getEtudiantsValidant();
        return ResponseEntity.ok(etudiants);
    }

    /**
     * Récupère les étudiants qui ont la première note (majorants)
     * GET /api/notes/majorants
     */
    @GetMapping("/majorants")
    public ResponseEntity<List<Etudiant>> getMajorants() {
        List<Etudiant> majorants = noteService.getMajorants();
        return ResponseEntity.ok(majorants);
    }

    /**
     * Récupère tous les étudiants triés par note
     * GET /api/notes/tries
     */
    @GetMapping("/tries")
    public ResponseEntity<List<Etudiant>> getEtudiantsTries() {
        List<Etudiant> etudiants = noteService.getEtudiantsTries();
        return ResponseEntity.ok(etudiants);
    }

    /**
     * Récupère tous les étudiants
     * GET /api/notes/etudiants
     */
    @GetMapping("/etudiants")
    public ResponseEntity<List<Etudiant>> getAllEtudiants() {
        List<Etudiant> etudiants = noteService.getAllEtudiants();
        return ResponseEntity.ok(etudiants);
    }

    /**
     * Récupère un étudiant par ID
     * GET /api/notes/etudiant/{id}
     */
    @GetMapping("/etudiant/{id}")
    public ResponseEntity<Etudiant> getEtudiantById(@PathVariable Long id) {
        return noteService.getEtudiantById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Récupère un étudiant par CNE
     * GET /api/notes/etudiant/cne/{cne}
     */
    @GetMapping("/etudiant/cne/{cne}")
    public ResponseEntity<Etudiant> getEtudiantByCne(@PathVariable String cne) {
        return noteService.getEtudiantByCne(cne)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Récupère la moyenne d'un étudiant
     * GET /api/notes/etudiant/{id}/moyenne
     */
    @GetMapping("/etudiant/{id}/moyenne")
    public ResponseEntity<Double> getMoyenneEtudiant(@PathVariable Long id) {
        return noteService.getEtudiantById(id)
                .map(etudiant -> ResponseEntity.ok(etudiant.getMoyenne()))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Calcule la note finale avec prise en compte de l'absence
     * GET /api/notes/etudiant/{id}/note-finale
     * Formule: N = M - T*M (N=note finale, M=moyenne, T=taux absence)
     */
    @GetMapping("/etudiant/{id}/note-finale")
    public ResponseEntity<Map<String, Object>> getNoteFinale(@PathVariable Long id) {
        Double noteFinale = noteService.getNoteFinaleAvecAbsence(id);

        if (noteFinale == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("etudiantId", id);
        response.put("noteFinale", noteFinale);
        response.put("valide", noteFinale >= 12.0);
        response.put("formule", "N = M - T*M (avec prise en compte de l'absence)");

        return ResponseEntity.ok(response);
    }

    /**
     * Calcule la note finale par CNE
     * GET /api/notes/etudiant/cne/{cne}/note-finale
     */
    @GetMapping("/etudiant/cne/{cne}/note-finale")
    public ResponseEntity<Map<String, Object>> getNoteFinaleBy Cne(@PathVariable String cne) {
        Double noteFinale = noteService.getNoteFinaleAvecAbsenceByCne(cne);

        if (noteFinale == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("cne", cne);
        response.put("noteFinale", noteFinale);
        response.put("valide", noteFinale >= 12.0);
        response.put("formule", "N = M - T*M (avec prise en compte de l'absence)");

        return ResponseEntity.ok(response);
    }

    /**
     * Met à jour un étudiant
     * PUT /api/notes/etudiant/{id}
     */
    @PutMapping("/etudiant/{id}")
    public ResponseEntity<Etudiant> updateEtudiant(@PathVariable Long id, @RequestBody Etudiant etudiant) {
        Etudiant updated = noteService.updateEtudiant(id, etudiant);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Supprime un étudiant
     * DELETE /api/notes/etudiant/{id}
     */
    @DeleteMapping("/etudiant/{id}")
    public ResponseEntity<Map<String, Object>> deleteEtudiant(@PathVariable Long id) {
        boolean success = noteService.deleteEtudiant(id);
        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        response.put("message", success ? "Étudiant supprimé" : "Étudiant non trouvé");
        return ResponseEntity.ok(response);
    }
}

