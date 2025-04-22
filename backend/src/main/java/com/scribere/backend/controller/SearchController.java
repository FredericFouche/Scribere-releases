package com.scribere.backend.controller;

import com.scribere.backend.dto.ArticleDto;
import com.scribere.backend.service.SearchService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SearchController {

    private static final Logger logger = LoggerFactory.getLogger(SearchController.class);
    private final SearchService searchService;

    public SearchController(SearchService searchService) {
        this.searchService = searchService;
    }

    // Annotation qui indique que cette méthode répond à une requête HTTP GET sur
    // l'URL "/search"
    @GetMapping("/search")
    public ResponseEntity<List<ArticleDto>> search(
            // Paramètre obligatoire "q" passé dans l'URL, correspondant à la requête de
            // recherche
            @RequestParam("q") String query,
            // Paramètre optionnel "limit" avec une valeur par défaut de 10 si non spécifié
            @RequestParam(value = "limit", defaultValue = "10") int limit) {

        // Log d'information pour indiquer qu'une requête de recherche a été reçue, avec
        // affichage des paramètres reçus (utile pour le débogage ou les logs serveur)
        logger.info("Search request received with query: '{}', limit: {}", query, limit);

        // Appel au service métier pour effectuer la recherche à partir du mot-clé et de
        // la limite
        List<ArticleDto> results = searchService.search(query, limit);

        // Retourne les résultats de la recherche encapsulés dans une réponse HTTP 200
        // OK
        return ResponseEntity.ok(results);
    }
}