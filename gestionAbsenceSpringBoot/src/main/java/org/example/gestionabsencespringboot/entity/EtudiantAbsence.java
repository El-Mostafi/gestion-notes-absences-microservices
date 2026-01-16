package org.example.gestionabsencespringboot.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entité EtudiantAbsence pour la gestion de l'absentéisme
 * Représente un étudiant et ses informations d'absence
 */
@Entity
@Table(name = "etudiants_absence")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EtudiantAbsence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(unique = true, nullable = false)
    private String cne; // Code National Étudiant

    @Column
    private String niveau; // Exemple: L1, L2, L3, M1, M2

    @Column
    private Double heuresAbsence; // Nombre d'heures d'absence

    @Column
    private Double heuresTotal; // Nombre total d'heures de cours

    @Column
    private String module; // Module concerné

    /**
     * Calcule le taux d'absence (en pourcentage décimal: 0.0 à 1.0)
     * Taux = heuresAbsence / heuresTotal
     */
    public Double getTauxAbsence() {
        if (heuresTotal == null || heuresTotal == 0) {
            return 0.0;
        }
        return heuresAbsence / heuresTotal;
    }

    /**
     * Vérifie si l'étudiant doit être dans la liste noire
     * @param seuil Le seuil en pourcentage (ex: 0.5 pour 50%)
     * @return true si le taux d'absence >= seuil
     */
    public boolean estListeNoire(Double seuil) {
        return getTauxAbsence() >= seuil;
    }

    /**
     * Retourne le taux d'absence en pourcentage (0-100)
     */
    public Double getTauxAbsencePourcentage() {
        return getTauxAbsence() * 100;
    }
}

