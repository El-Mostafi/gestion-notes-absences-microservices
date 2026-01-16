package org.example.gestionnotesspringboot.repositories;

import org.example.gestionnotesspringboot.entities.Etudiant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EtudiantRepository extends JpaRepository<Etudiant, Long> {

    Optional<Etudiant> findByCne(String cne);

    boolean existsByCne(String cne);

    // Trouver les étudiants avec un nombre d'heures d'absence supérieur ou égal à un seuil
    List<Etudiant> findByHeuresAbsenceGreaterThanEqualOrderByHeuresAbsenceDescNomAsc(Integer heuresAbsence);

    // Requête personnalisée pour la blacklist basée sur le taux d'absence
    @Query("SELECT e FROM Etudiant e WHERE (e.heuresAbsence / 500.0) * 100 >= :tauxSeuil ORDER BY e.heuresAbsence DESC, e.nom ASC")
    List<Etudiant> findBlackListByTauxAbsence(@Param("tauxSeuil") Double tauxSeuil);
}

