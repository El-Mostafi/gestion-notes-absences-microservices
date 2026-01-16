package org.example.gestionabsencespringboot.service;

import org.example.gestionabsencespringboot.entity.EtudiantAbsence;
import org.example.gestionabsencespringboot.repository.EtudiantAbsenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service de gestion de l'absentéisme
 * Implémente toutes les opérations du cahier des charges
 */
@Service
public class AbsenceService {

    @Autowired
    private EtudiantAbsenceRepository etudiantAbsenceRepository;

    /**
     * Add - Ajoute un nouvel étudiant avec ses informations d'absence
     */
    public EtudiantAbsence add(EtudiantAbsence etudiant) {
        return etudiantAbsenceRepository.save(etudiant);
    }

    /**
     * Read - Retourne le taux d'absence d'un étudiant donné
     * @param id ID de l'étudiant
     * @return Le taux d'absence (0.0 à 1.0)
     */
    public Double read(Long id) {
        Optional<EtudiantAbsence> etudiant = etudiantAbsenceRepository.findById(id);
        return etudiant.map(EtudiantAbsence::getTauxAbsence).orElse(null);
    }

    /**
     * Update - Met à jour les informations d'un étudiant
     */
    public EtudiantAbsence update(Long id, EtudiantAbsence etudiant) {
        if (etudiantAbsenceRepository.existsById(id)) {
            etudiant.setId(id);
            return etudiantAbsenceRepository.save(etudiant);
        }
        return null;
    }

    /**
     * Delete - Supprime un étudiant de la liste des étudiants non-assidus
     */
    public boolean delete(Long id) {
        if (etudiantAbsenceRepository.existsById(id)) {
            etudiantAbsenceRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * BlackListCreate - Dresse la liste noire des étudiants
     * avec un taux d'absentéisme >= seuil
     * Liste triée par heures d'absence DESC, puis nom ASC
     * @param seuil Le seuil (ex: 0.5 pour 50%)
     */
    public List<EtudiantAbsence> blackListCreate(Double seuil) {
        if (seuil == null) {
            seuil = 0.5; // Seuil par défaut: 50%
        }
        return etudiantAbsenceRepository.findListeNoire(seuil);
    }

    /**
     * Récupère tous les étudiants
     */
    public List<EtudiantAbsence> getAllEtudiants() {
        return etudiantAbsenceRepository.findAll();
    }

    /**
     * Récupère un étudiant par ID
     */
    public Optional<EtudiantAbsence> getEtudiantById(Long id) {
        return etudiantAbsenceRepository.findById(id);
    }

    /**
     * Récupère un étudiant par CNE
     */
    public Optional<EtudiantAbsence> getEtudiantByCne(String cne) {
        return etudiantAbsenceRepository.findByCne(cne);
    }

    /**
     * Récupère le taux d'absence d'un étudiant par CNE
     */
    public Double getTauxAbsenceByCne(String cne) {
        Optional<EtudiantAbsence> etudiant = etudiantAbsenceRepository.findByCne(cne);
        return etudiant.map(EtudiantAbsence::getTauxAbsence).orElse(null);
    }

    /**
     * Compte le nombre d'étudiants dans la liste noire
     */
    public Long countListeNoire(Double seuil) {
        if (seuil == null) {
            seuil = 0.5;
        }
        return (long) blackListCreate(seuil).size();
    }
}

