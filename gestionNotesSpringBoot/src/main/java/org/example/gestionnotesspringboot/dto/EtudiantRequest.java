package org.example.gestionnotesspringboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EtudiantRequest {
    private String nom;
    private String prenom;
    private String cne;
    private String niveau;
    private Integer heuresAbsence;
}

