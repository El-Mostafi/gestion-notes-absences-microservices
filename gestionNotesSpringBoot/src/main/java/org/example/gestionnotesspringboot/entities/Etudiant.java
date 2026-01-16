package org.example.gestionnotesspringboot.entities;

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

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(unique = true, nullable = false, name = "cne")
    private String cne; // Code National Etudiant

    @Column(nullable = false)
    private String niveau; // ex: "L1", "L2", "L3", "M1", "M2"

    @Column(nullable = false)
    private Integer heuresAbsence; // Nombre d'heures d'absentéisme

    // Méthode pour calculer le taux d'absence (supposant 500 heures totales par année)
    public double getTauxAbsence() {
        return (heuresAbsence / 500.0) * 100;
    }

}
