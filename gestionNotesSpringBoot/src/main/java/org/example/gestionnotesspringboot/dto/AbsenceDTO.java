package org.example.gestionnotesspringboot.dto;

import java.time.LocalDate;

/**
 * DTO pour recevoir les informations des absences depuis le service Gestion Absence
 */
public class AbsenceDTO {

    private Long id;
    private Long etudiantId;
    private LocalDate dateAbsence;
    private String matiere;
    private Boolean justifiee;
    private String motif;

    // Constructeurs
    public AbsenceDTO() {
    }

    public AbsenceDTO(Long id, Long etudiantId, LocalDate dateAbsence, String matiere, Boolean justifiee, String motif) {
        this.id = id;
        this.etudiantId = etudiantId;
        this.dateAbsence = dateAbsence;
        this.matiere = matiere;
        this.justifiee = justifiee;
        this.motif = motif;
    }

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getEtudiantId() {
        return etudiantId;
    }

    public void setEtudiantId(Long etudiantId) {
        this.etudiantId = etudiantId;
    }

    public LocalDate getDateAbsence() {
        return dateAbsence;
    }

    public void setDateAbsence(LocalDate dateAbsence) {
        this.dateAbsence = dateAbsence;
    }

    public String getMatiere() {
        return matiere;
    }

    public void setMatiere(String matiere) {
        this.matiere = matiere;
    }

    public Boolean getJustifiee() {
        return justifiee;
    }

    public void setJustifiee(Boolean justifiee) {
        this.justifiee = justifiee;
    }

    public String getMotif() {
        return motif;
    }

    public void setMotif(String motif) {
        this.motif = motif;
    }
}

