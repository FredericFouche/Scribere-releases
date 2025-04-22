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

    @GetMapping("/search")
    public ResponseEntity<List<ArticleDto>> search(
            @RequestParam("q") String query,
            @RequestParam(value = "limit", defaultValue = "10") int limit) {

        logger.info("Search request received with query: '{}', limit: {}", query, limit);
        List<ArticleDto> results = searchService.search(query, limit);
        return ResponseEntity.ok(results);
    }
}