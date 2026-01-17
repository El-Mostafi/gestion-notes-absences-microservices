package org.example.gestionabsencespringboot.config;

import org.example.gestionabsencespringboot.entity.Etudiant;
import org.example.gestionabsencespringboot.entity.EtudiantAbsence;
import org.example.gestionabsencespringboot.repository.EtudiantRepository;
import org.example.gestionabsencespringboot.repository.EtudiantAbsenceRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(EtudiantRepository repository, EtudiantAbsenceRepository absenceRepository) {
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

            // Initialiser les données d'absence pour le blacklist
            EtudiantAbsence abs1 = new EtudiantAbsence();
            abs1.setNom("Dupont");
            abs1.setPrenom("Jean");
            abs1.setCne("CNE001");
            abs1.setNiveau("L2");
            abs1.setHeuresAbsence(60.0);  // 60% absence - HIGH
            abs1.setHeuresTotal(100.0);
            abs1.setModule("Informatique");
            absenceRepository.save(abs1);

            EtudiantAbsence abs2 = new EtudiantAbsence();
            abs2.setNom("Martin");
            abs2.setPrenom("Marie");
            abs2.setCne("CNE002");
            abs2.setNiveau("L1");
            abs2.setHeuresAbsence(85.0);  // 85% absence - CRITICAL
            abs2.setHeuresTotal(100.0);
            abs2.setModule("Mathématiques");
            absenceRepository.save(abs2);

            EtudiantAbsence abs3 = new EtudiantAbsence();
            abs3.setNom("Bernard");
            abs3.setPrenom("Pierre");
            abs3.setCne("CNE003");
            abs3.setNiveau("L3");
            abs3.setHeuresAbsence(20.0);  // 20% absence - OK
            abs3.setHeuresTotal(100.0);
            abs3.setModule("Physique");
            absenceRepository.save(abs3);

            EtudiantAbsence abs4 = new EtudiantAbsence();
            abs4.setNom("Dubois");
            abs4.setPrenom("Sophie");
            abs4.setCne("CNE004");
            abs4.setNiveau("M1");
            abs4.setHeuresAbsence(55.0);  // 55% absence - MEDIUM
            abs4.setHeuresTotal(100.0);
            abs4.setModule("Chimie");
            absenceRepository.save(abs4);

            EtudiantAbsence abs5 = new EtudiantAbsence();
            abs5.setNom("Thomas");
            abs5.setPrenom("Luc");
            abs5.setCne("CNE005");
            abs5.setNiveau("L2");
            abs5.setHeuresAbsence(90.0);  // 90% absence - CRITICAL
            abs5.setHeuresTotal(100.0);
            abs5.setModule("Informatique");
            absenceRepository.save(abs5);

            EtudiantAbsence abs6 = new EtudiantAbsence();
            abs6.setNom("Robert");
            abs6.setPrenom("Julie");
            abs6.setCne("CNE006");
            abs6.setNiveau("M2");
            abs6.setHeuresAbsence(30.0);  // 30% absence - OK
            abs6.setHeuresTotal(100.0);
            abs6.setModule("Biologie");
            absenceRepository.save(abs6);

            EtudiantAbsence abs7 = new EtudiantAbsence();
            abs7.setNom("Petit");
            abs7.setPrenom("Paul");
            abs7.setCne("CNE007");
            abs7.setNiveau("L1");
            abs7.setHeuresAbsence(70.0);  // 70% absence - HIGH
            abs7.setHeuresTotal(100.0);
            abs7.setModule("Anglais");
            absenceRepository.save(abs7);

            System.out.println("✅ Base de données d'absences initialisée avec " + absenceRepository.count() + " étudiants");
        };
    }
}

