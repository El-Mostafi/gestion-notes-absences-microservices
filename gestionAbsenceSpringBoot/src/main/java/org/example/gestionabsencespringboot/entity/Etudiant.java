package org.example.gestionabsencespringboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "etudiants")
public class Etudiant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    private Double note1;

    private Double note2;

    // Constructor sans l'id pour faciliter la création
    public Etudiant(String nom, String prenom, Double note1, Double note2) {
        this.nom = nom;
        this.prenom = prenom;
        this.note1 = note1;
        this.note2 = note2;
    }

    // Méthode pour vérifier si l'étudiant a validé le module (note > 12)
    public boolean hasValidatedModule() {
        return note1 != null && note1 > 12;
    }

    // Méthode pour obtenir la meilleure note
    public Double getMeilleureNote() {
        if (note1 == null && note2 == null) return null;
        if (note1 == null) return note2;
        if (note2 == null) return note1;
        return Math.max(note1, note2);
    }
}

