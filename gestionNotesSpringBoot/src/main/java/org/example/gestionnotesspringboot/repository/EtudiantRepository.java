package org.example.gestionnotesspringboot.repository;

import org.example.gestionnotesspringboot.entity.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {

    /**
     * Trouve un étudiant par son nom
     */
    Optional<Etudiant> findByNom(String nom);

    /**
     * Trouve un étudiant par son CNE
     */
    Optional<Etudiant> findByCne(String cne);

    /**
     * Trouve tous les étudiants d'un module donné
     */
    List<Etudiant> findByModule(String module);

    /**
     * Trouve les étudiants qui ont validé (moyenne >= 12)
     */
    @Query("SELECT e FROM Etudiant e WHERE (e.note1 + e.note2) / 2.0 >= 12.0")
    List<Etudiant> findEtudiantsValidant();

    /**
     * Trouve les étudiants avec la note maximale
     */
    @Query("SELECT e FROM Etudiant e WHERE (e.note1 + e.note2) / 2.0 = " +
           "(SELECT MAX((e2.note1 + e2.note2) / 2.0) FROM Etudiant e2)")
    List<Etudiant> findMajorants();

    /**
     * Trouve tous les étudiants triés par moyenne décroissante
     */
    @Query("SELECT e FROM Etudiant e ORDER BY (e.note1 + e.note2) / 2.0 DESC")
    List<Etudiant> findAllOrderByMoyenneDesc();
}

