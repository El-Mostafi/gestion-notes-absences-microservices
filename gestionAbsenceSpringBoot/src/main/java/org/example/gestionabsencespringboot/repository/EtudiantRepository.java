package org.example.gestionabsencespringboot.repository;

import org.example.gestionabsencespringboot.entity.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {

    // Trouver un étudiant par nom
    Optional<Etudiant> findByNom(String nom);

    // Trouver les étudiants qui ont validé le module (note1 > 12)
    @Query("SELECT e FROM Etudiant e WHERE e.note1 > 12")
    List<Etudiant> findEtudiantsValidant();

    // Trouver les étudiants avec la première note (note1) maximale
    @Query("SELECT e FROM Etudiant e WHERE e.note1 = (SELECT MAX(e2.note1) FROM Etudiant e2)")
    List<Etudiant> findEtudiantsMajorant();
}