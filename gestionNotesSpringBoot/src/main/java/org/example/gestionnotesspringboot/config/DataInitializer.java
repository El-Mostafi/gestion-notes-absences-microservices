package org.example.gestionnotesspringboot.config;

import org.example.gestionnotesspringboot.entities.Etudiant;
import org.example.gestionnotesspringboot.repositories.EtudiantRepository;
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
                etudiantRepository.save(new Etudiant(null, "Alami", "Ahmed", "CNE001", "L3", 50));
                etudiantRepository.save(new Etudiant(null, "Benjelloun", "Fatima", "CNE002", "M1", 120));
                etudiantRepository.save(new Etudiant(null, "Chakir", "Omar", "CNE003", "L2", 300));
                etudiantRepository.save(new Etudiant(null, "Darif", "Sara", "CNE004", "L3", 450));
                etudiantRepository.save(new Etudiant(null, "El Amrani", "Karim", "CNE005", "M2", 80));
                etudiantRepository.save(new Etudiant(null, "Fassi", "Leila", "CNE006", "L1", 250));
                etudiantRepository.save(new Etudiant(null, "Ghali", "Hassan", "CNE007", "L3", 350));
                etudiantRepository.save(new Etudiant(null, "Hamidi", "Nadia", "CNE008", "M1", 150));

                System.out.println("✅ Données de test initialisées avec succès!");
            }
        };
    }
}

