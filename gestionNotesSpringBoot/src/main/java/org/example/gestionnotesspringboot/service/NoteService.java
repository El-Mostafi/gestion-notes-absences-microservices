package org.example.gestionnotesspringboot.service;

import org.example.gestionnotesspringboot.client.AbsenceClient;
import org.example.gestionnotesspringboot.entity.Etudiant;
import org.example.gestionnotesspringboot.repository.EtudiantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service de gestion des notes des étudiants
 * Implémente toutes les opérations du cahier des charges
 */
@Service
public class NoteService {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private AbsenceClient absenceClient;

    /**
     * Ajoute un nouvel étudiant
     * @return true si ajouté, false sinon
     */
    public boolean ajouterEtudiant(Etudiant etudiant) {
        try {
            etudiantRepository.save(etudiant);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Récupère la note (moyenne) d'un étudiant par son nom
     */
    public Double getNote(String nom) {
        Optional<Etudiant> etudiant = etudiantRepository.findByNom(nom);
        return etudiant.map(Etudiant::getMoyenne).orElse(null);
    }

    /**
     * Récupère tous les étudiants qui ont validé le module (moyenne >= 12)
     */
    public List<Etudiant> getEtudiantsValidant() {
        return etudiantRepository.findEtudiantsValidant();
    }

    /**
     * Récupère les étudiants qui ont obtenu la première note (majorants)
     */
    public List<Etudiant> getMajorants() {
        return etudiantRepository.findMajorants();
    }

    /**
     * Récupère tous les étudiants triés par note (décroissant)
     */
    public List<Etudiant> getEtudiantsTries() {
        return etudiantRepository.findAllOrderByMoyenneDesc();
    }

    /**
     * Récupère tous les étudiants
     */
    public List<Etudiant> getAllEtudiants() {
        return etudiantRepository.findAll();
    }

    /**
     * Récupère un étudiant par ID
     */
    public Optional<Etudiant> getEtudiantById(Long id) {
        return etudiantRepository.findById(id);
    }

    /**
     * Récupère un étudiant par CNE
     */
    public Optional<Etudiant> getEtudiantByCne(String cne) {
        return etudiantRepository.findByCne(cne);
    }

    /**
     * Met à jour un étudiant
     */
    public Etudiant updateEtudiant(Long id, Etudiant etudiant) {
        if (etudiantRepository.existsById(id)) {
            etudiant.setId(id);
            return etudiantRepository.save(etudiant);
        }
        return null;
    }

    /**
     * Supprime un étudiant
     */
    public boolean deleteEtudiant(Long id) {
        if (etudiantRepository.existsById(id)) {
            etudiantRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Calcule la note finale d'un étudiant en tenant compte de son taux d'absence
     * Formule: N = M - T*M
     * N = note finale, M = moyenne, T = taux d'absence
     */
    public Double getNoteFinaleAvecAbsence(Long etudiantId) {
        Optional<Etudiant> etudiantOpt = etudiantRepository.findById(etudiantId);
        if (etudiantOpt.isEmpty()) {
            return null;
        }

        Etudiant etudiant = etudiantOpt.get();
        Double moyenne = etudiant.getMoyenne();

        try {
            // Appel au service Absence pour récupérer le taux d'absence
            Double tauxAbsence = absenceClient.getTauxAbsence(etudiantId);

            if (tauxAbsence == null) {
                // Si pas d'absences enregistrées, retourner la moyenne
                return moyenne;
            }

            // Calculer la note finale
            return etudiant.getNoteFinale(tauxAbsence);

        } catch (Exception e) {
            // En cas d'erreur (service Absence indisponible), retourner la moyenne
            System.err.println("Erreur lors de la récupération du taux d'absence: " + e.getMessage());
            return moyenne;
        }
    }

    /**
     * Calcule la note finale d'un étudiant par son CNE
     */
    public Double getNoteFinaleAvecAbsenceByCne(String cne) {
        Optional<Etudiant> etudiantOpt = etudiantRepository.findByCne(cne);
        if (etudiantOpt.isEmpty()) {
            return null;
        }
        return getNoteFinaleAvecAbsence(etudiantOpt.get().getId());
    }
}

