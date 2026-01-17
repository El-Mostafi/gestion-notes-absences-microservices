package org.example.gestionnotesspringboot.controller;

import org.example.gestionnotesspringboot.dto.EtudiantRequest;
import org.example.gestionnotesspringboot.dto.EtudiantResponse;
import org.example.gestionnotesspringboot.dto.TauxAbsenceResponse;
import org.example.gestionnotesspringboot.service.EtudiantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
// @CrossOrigin removed - CORS is handled by API Gateway
@RequestMapping("/api/etudiants")
public class EtudiantController {

    @Autowired
    private EtudiantService etudiantService;


    @PostMapping
    public ResponseEntity<EtudiantResponse> addEtudiant(@RequestBody EtudiantRequest request) {
        EtudiantResponse response = etudiantService.addEtudiant(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @GetMapping("/{id}/taux-absence")
    public ResponseEntity<TauxAbsenceResponse> getTauxAbsence(@PathVariable Long id) {
        TauxAbsenceResponse response = etudiantService.getTauxAbsence(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<EtudiantResponse> getEtudiantById(@PathVariable Long id) {
        EtudiantResponse response = etudiantService.getEtudiantById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @GetMapping
    public ResponseEntity<List<EtudiantResponse>> getAllEtudiants() {
        List<EtudiantResponse> etudiants = etudiantService.getAllEtudiants();
        return new ResponseEntity<>(etudiants, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<EtudiantResponse> updateEtudiant(
            @PathVariable Long id,
            @RequestBody EtudiantRequest request) {
        EtudiantResponse response = etudiantService.updateEtudiant(id, request);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEtudiant(@PathVariable Long id) {
        etudiantService.deleteEtudiant(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @GetMapping("/blacklist")
    public ResponseEntity<List<EtudiantResponse>> createBlackList(
            @RequestParam(defaultValue = "50.0") Double tauxSeuil) {
        List<EtudiantResponse> blackList = etudiantService.createBlackList(tauxSeuil);
        return new ResponseEntity<>(blackList, HttpStatus.OK);
    }
}

