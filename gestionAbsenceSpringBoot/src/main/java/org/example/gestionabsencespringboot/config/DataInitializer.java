package org.example.gestionabsencespringboot.config;

import org.example.gestionabsencespringboot.entity.Etudiant;
import org.example.gestionabsencespringboot.repository.EtudiantRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(EtudiantRepository repository) {
        return args -> {
            // Initialiser quelques étudiants pour tester
            repository.save(new Etudiant("Dupont", "Jean", 15.0, 13.0));
            repository.save(new Etudiant("Martin", "Marie", 11.0, 14.0));
            repository.save(new Etudiant("Bernard", "Pierre", 16.0, 15.5));
            repository.save(new Etudiant("Dubois", "Sophie", 9.0, 10.5));
            repository.save(new Etudiant("Thomas", "Luc", 13.5, 12.0));
            repository.save(new Etudiant("Robert", "Julie", 16.0, 17.0));
            repository.save(new Etudiant("Petit", "Paul", 8.0, 11.0));

            System.out.println("✅ Base de données initialisée avec " + repository.count() + " étudiants");
        };
    }
}

