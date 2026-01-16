package org.example.gestionabsencespringboot.dto;

/**
 * DTO pour recevoir les informations des notes depuis le service Gestion Notes
 */
public class NoteDTO {

    private Long id;
    private Long etudiantId;
    private String matiere;
    private Double note;
    private String semestre;

    // Constructeurs
    public NoteDTO() {
    }

    public NoteDTO(Long id, Long etudiantId, String matiere, Double note, String semestre) {
        this.id = id;
        this.etudiantId = etudiantId;
        this.matiere = matiere;
        this.note = note;
        this.semestre = semestre;
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

    public String getMatiere() {
        return matiere;
    }

    public void setMatiere(String matiere) {
        this.matiere = matiere;
    }

    public Double getNote() {
        return note;
    }

    public void setNote(Double note) {
        this.note = note;
    }

    public String getSemestre() {
        return semestre;
    }

    public void setSemestre(String semestre) {
        this.semestre = semestre;
    }
}

