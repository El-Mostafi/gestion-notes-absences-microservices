package org.example.gestionnotesspringboot.service;

import org.example.gestionnotesspringboot.dto.EtudiantRequest;
import org.example.gestionnotesspringboot.dto.EtudiantResponse;
import org.example.gestionnotesspringboot.dto.TauxAbsenceResponse;
import org.example.gestionnotesspringboot.entity.Etudiant;
import org.example.gestionnotesspringboot.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EtudiantService {

    @Autowired
    private EtudiantRepository etudiantRepository;

    // ADD - Ajouter un étudiant
    public EtudiantResponse addEtudiant(EtudiantRequest request) {
        if (etudiantRepository.existsByCne(request.getCne())) {
            throw new RuntimeException("Un étudiant avec ce CNE existe déjà");
        }

        Etudiant etudiant = new Etudiant();
        etudiant.setNom(request.getNom());
        etudiant.setPrenom(request.getPrenom());
        etudiant.setCne(request.getCne());
        etudiant.setNiveau(request.getNiveau());
        etudiant.setHeuresAbsence(request.getHeuresAbsence());

        Etudiant saved = etudiantRepository.save(etudiant);
        return toResponse(saved);
    }

    // READ - Obtenir le taux d'absence d'un étudiant
    public TauxAbsenceResponse getTauxAbsence(Long id) {
        Etudiant etudiant = etudiantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé avec l'ID: " + id));

        return toTauxAbsenceResponse(etudiant);
    }

    // READ - Obtenir un étudiant par ID
    public EtudiantResponse getEtudiantById(Long id) {
        Etudiant etudiant = etudiantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé avec l'ID: " + id));

        return toResponse(etudiant);
    }

    // READ - Obtenir tous les étudiants
    public List<EtudiantResponse> getAllEtudiants() {
        return etudiantRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // UPDATE - Mettre à jour un étudiant
    public EtudiantResponse updateEtudiant(Long id, EtudiantRequest request) {
        Etudiant etudiant = etudiantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé avec l'ID: " + id));

        // Vérifier si le CNE est déjà utilisé par un autre étudiant
        if (!etudiant.getCne().equals(request.getCne()) && etudiantRepository.existsByCne(request.getCne())) {
            throw new RuntimeException("Un autre étudiant avec ce CNE existe déjà");
        }

        etudiant.setNom(request.getNom());
        etudiant.setPrenom(request.getPrenom());
        etudiant.setCne(request.getCne());
        etudiant.setNiveau(request.getNiveau());
        etudiant.setHeuresAbsence(request.getHeuresAbsence());

        Etudiant updated = etudiantRepository.save(etudiant);
        return toResponse(updated);
    }

    // DELETE - Supprimer un étudiant
    public void deleteEtudiant(Long id) {
        if (!etudiantRepository.existsById(id)) {
            throw new RuntimeException("Étudiant non trouvé avec l'ID: " + id);
        }
        etudiantRepository.deleteById(id);
    }

    // BLACKLIST CREATE - Créer une liste noire des étudiants
    public List<EtudiantResponse> createBlackList(Double tauxSeuil) {
        List<Etudiant> blackList = etudiantRepository.findBlackListByTauxAbsence(tauxSeuil);
        return blackList.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    // Méthodes de conversion
    private EtudiantResponse toResponse(Etudiant etudiant) {
        EtudiantResponse response = new EtudiantResponse();
        response.setId(etudiant.getId());
        response.setNom(etudiant.getNom());
        response.setPrenom(etudiant.getPrenom());
        response.setCne(etudiant.getCne());
        response.setNiveau(etudiant.getNiveau());
        response.setHeuresAbsence(etudiant.getHeuresAbsence());
        response.setTauxAbsence(etudiant.getTauxAbsence());
        return response;
    }

    private TauxAbsenceResponse toTauxAbsenceResponse(Etudiant etudiant) {
        TauxAbsenceResponse response = new TauxAbsenceResponse();
        response.setId(etudiant.getId());
        response.setNom(etudiant.getNom());
        response.setPrenom(etudiant.getPrenom());
        response.setCne(etudiant.getCne());
        response.setHeuresAbsence(etudiant.getHeuresAbsence());
        response.setTauxAbsence(etudiant.getTauxAbsence());
        return response;
    }
}

