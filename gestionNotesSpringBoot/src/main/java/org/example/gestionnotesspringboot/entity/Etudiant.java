package org.example.gestionnotesspringboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entité Etudiant pour la gestion des notes
 * Représente un étudiant avec ses notes dans un module
 */
@Entity
@Table(name = "etudiants")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Etudiant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(unique = true)
    private String cne; // Code National Étudiant

    // Note du premier élément du module
    @Column
    private Double note1;

    // Note du deuxième élément du module
    @Column
    private Double note2;

    @Column
    private String module;

    /**
     * Calcule la moyenne des notes (note1 + note2) / 2
     */
    public Double getMoyenne() {
        if (note1 != null && note2 != null) {
            return (note1 + note2) / 2.0;
        }
        return 0.0;
    }

    /**
     * Vérifie si l'étudiant a validé le module (moyenne >= 12)
     */
    public boolean aValide() {
        return getMoyenne() >= 12.0;
    }

    /**
     * Calcule la note finale en tenant compte du taux d'absence
     * Formule: N = M - T*M
     * N = note finale, M = moyenne, T = taux d'absence
     */
    public Double getNoteFinale(Double tauxAbsence) {
        Double moyenne = getMoyenne();
        if (tauxAbsence == null || tauxAbsence < 0) {
            tauxAbsence = 0.0;
        }
        // Limiter le taux d'absence à 100%
        if (tauxAbsence > 1.0) {
            tauxAbsence = 1.0;
        }
        return moyenne - (tauxAbsence * moyenne);
    }
}

