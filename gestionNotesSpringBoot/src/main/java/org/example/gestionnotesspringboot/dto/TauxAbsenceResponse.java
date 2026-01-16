package org.example.gestionnotesspringboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TauxAbsenceResponse {
    private Long id;
    private String nom;
    private String prenom;
    private String cne;
    private Integer heuresAbsence;
    private Double tauxAbsence;
}

