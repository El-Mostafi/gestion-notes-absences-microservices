package org.example.gestionabsencespringboot.controller;

import org.example.gestionabsencespringboot.entity.Etudiant;
import org.example.gestionabsencespringboot.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
// @CrossOrigin removed - CORS is handled by API Gateway
@RequestMapping("/api/etudiants")
public class EtudiantController {

    @Autowired
    private EtudiantRepository etudiantRepository;

    /**
     * Opération 1: ajouterEtudiant
     * Permet d'ajouter un nouvel étudiant
     * Retourne false si le tableau est plein, la valeur true sinon
     */
    @PostMapping("/ajouter")
    public ResponseEntity<Boolean> ajouterEtudiant(@RequestBody Etudiant etudiant) {
        try {
            // Vérifier si un étudiant avec ce nom existe déjà (nom unique)
            if (etudiantRepository.findByNom(etudiant.getNom()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(false);
            }

            etudiantRepository.save(etudiant);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }

    /**
     * Opération 2: getNote
     * Fournit la note associée à un nom d'étudiant fourni en argument
     */
    @GetMapping("/note/{nom}")
    public ResponseEntity<?> getNote(@PathVariable String nom) {
        Optional<Etudiant> etudiant = etudiantRepository.findByNom(nom);

        if (etudiant.isPresent()) {
            // Retourner les deux notes
            return ResponseEntity.ok(new NoteResponse(
                etudiant.get().getNom(),
                etudiant.get().getPrenom(),
                etudiant.get().getNote1(),
                etudiant.get().getNote2()
            ));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Étudiant non trouvé avec le nom: " + nom);
        }
    }

    /**
     * Opération 3: getEtudiantsValidant
     * Fournit un tableau d'étudiants qui ont validé le module
     * (un étudiant valide un module si sa note est supérieure ou égale à 12)
     */
    @GetMapping("/validant")
    public ResponseEntity<List<Etudiant>> getEtudiantsValidant() {
        List<Etudiant> etudiants = etudiantRepository.findEtudiantsValidant();
        return ResponseEntity.ok(etudiants);
    }

    /**
     * Opération 4: getMajorant
     * Permet de donner les étudiants qui ont obtenu la première note maximale
     */
    @GetMapping("/majorant")
    public ResponseEntity<List<Etudiant>> getMajorant() {
        List<Etudiant> etudiants = etudiantRepository.findEtudiantsMajorant();
        return ResponseEntity.ok(etudiants);
    }

    /**
     * Opération 5: getEtudiantTries
     * Fournit un tableau d'étudiants trié selon la note obtenue
     * Le premier élément du tableau est l'étudiant ayant obtenu la première note,
     * le dernier élément est l'étudiant ayant obtenu la dernière note
     */
    @GetMapping("/tries")
    public ResponseEntity<List<EtudiantTrieResponse>> getEtudiantTries() {
        List<Etudiant> etudiants = etudiantRepository.findAll();

        // Créer une liste de réponses avec la meilleure note
        List<EtudiantTrieResponse> response = new ArrayList<>();
        for (Etudiant e : etudiants) {
            response.add(new EtudiantTrieResponse(
                e.getId(),
                e.getNom(),
                e.getPrenom(),
                e.getNote1(),
                e.getNote2(),
                e.getMeilleureNote()
            ));
        }

        // Trier par meilleure note (décroissant: première note d'abord, dernière note à la fin)
        response.sort(Comparator.comparing(EtudiantTrieResponse::getMeilleureNote,
            Comparator.nullsLast(Comparator.reverseOrder())));

        return ResponseEntity.ok(response);
    }

    /**
     * Méthode supplémentaire: obtenir tous les étudiants
     */
    @GetMapping
    public ResponseEntity<List<Etudiant>> getAllEtudiants() {
        return ResponseEntity.ok(etudiantRepository.findAll());
    }

    /**
     * Méthode supplémentaire: obtenir un étudiant par ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getEtudiantById(@PathVariable Long id) {
        Optional<Etudiant> etudiant = etudiantRepository.findById(id);
        if (etudiant.isPresent()) {
            return ResponseEntity.ok(etudiant.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("Étudiant non trouvé avec l'ID: " + id);
        }
    }

    // Classes internes pour les réponses
    static class NoteResponse {
        private String nom;
        private String prenom;
        private Double note1;
        private Double note2;

        public NoteResponse(String nom, String prenom, Double note1, Double note2) {
            this.nom = nom;
            this.prenom = prenom;
            this.note1 = note1;
            this.note2 = note2;
        }

        // Getters
        public String getNom() { return nom; }
        public String getPrenom() { return prenom; }
        public Double getNote1() { return note1; }
        public Double getNote2() { return note2; }
    }

    static class EtudiantTrieResponse {
        private Long id;
        private String nom;
        private String prenom;
        private Double note1;
        private Double note2;
        private Double meilleureNote;

        public EtudiantTrieResponse(Long id, String nom, String prenom, Double note1, Double note2, Double meilleureNote) {
            this.id = id;
            this.nom = nom;
            this.prenom = prenom;
            this.note1 = note1;
            this.note2 = note2;
            this.meilleureNote = meilleureNote;
        }

        // Getters
        public Long getId() { return id; }
        public String getNom() { return nom; }
        public String getPrenom() { return prenom; }
        public Double getNote1() { return note1; }
        public Double getNote2() { return note2; }
        public Double getMeilleureNote() { return meilleureNote; }
    }
}


