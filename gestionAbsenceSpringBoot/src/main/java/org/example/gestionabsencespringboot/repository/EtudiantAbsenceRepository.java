package org.example.gestionabsencespringboot.repository;

import org.example.gestionabsencespringboot.entity.EtudiantAbsence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EtudiantAbsenceRepository extends JpaRepository<EtudiantAbsence, Long> {

    /**
     * Trouve un étudiant par son CNE
     */
    Optional<EtudiantAbsence> findByCne(String cne);

    /**
     * Trouve tous les étudiants d'un niveau donné
     */
    List<EtudiantAbsence> findByNiveau(String niveau);

    /**
     * Trouve les étudiants avec un taux d'absence >= seuil
     * Triés par heuresAbsence DESC, puis par nom ASC
     */
    @Query("SELECT e FROM EtudiantAbsence e WHERE (e.heuresAbsence / e.heuresTotal) >= :seuil " +
           "ORDER BY e.heuresAbsence DESC, e.nom ASC")
    List<EtudiantAbsence> findListeNoire(@Param("seuil") Double seuil);
}

