package org.example.gestionnotesspringboot.config;

import org.example.gestionnotesspringboot.entity.Etudiant;
import org.example.gestionnotesspringboot.repository.EtudiantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(EtudiantRepository etudiantRepository) {
        return args -> {
            // Vérifier si la base de données est vide
            if (etudiantRepository.count() == 0) {
                // Ajouter des étudiants de test
                etudiantRepository.save(new Etudiant(
                        null,
                        "Alami",
                        "Ahmed",
                        "CNE001",
                        14.0,
                        12.0,
                        "Mathématiques",
                        "L3",
                        20
                ));

                etudiantRepository.save(new Etudiant(
                        null,
                        "Benjelloun",
                        "Fatima",
                        "CNE002",
                        16.5,
                        15.0,
                        "Programmation Java",
                        "M1",
                        10
                ));

                etudiantRepository.save(new Etudiant(
                        null,
                        "Chakir",
                        "Omar",
                        "CNE003",
                        10.0,
                        11.5,
                        "Bases de données",
                        "L2",
                        60
                ));

                etudiantRepository.save(new Etudiant(
                        null,
                        "Darif",
                        "Sara",
                        "CNE004",
                        18.0,
                        17.0,
                        "Réseaux",
                        "L3",
                        5
                ));

                etudiantRepository.save(new Etudiant(
                        null,
                        "El Amrani",
                        "Karim",
                        "CNE005",
                        13.0,
                        14.0,
                        "Intelligence Artificielle",
                        "M2",
                        30
                ));

                etudiantRepository.save(new Etudiant(
                        null,
                        "Fassi",
                        "Leila",
                        "CNE006",
                        9.0,
                        10.0,
                        "Algorithmique",
                        "L1",
                        80
                ));

                etudiantRepository.save(new Etudiant(
                        null,
                        "Ghali",
                        "Hassan",
                        "CNE007",
                        15.0,
                        16.0,
                        "Systèmes d'exploitation",
                        "L3",
                        25
                ));

                etudiantRepository.save(new Etudiant(
                        null,
                        "Hamidi",
                        "Nadia",
                        "CNE008",
                        17.5,
                        18.0,
                        "Développement Web",
                        "M1",
                        12
                ));

                System.out.println("✅ Données de test initialisées avec succès!");
            }
        };
    }
}

