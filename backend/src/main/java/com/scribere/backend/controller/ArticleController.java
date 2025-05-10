package com.scribere.backend.controller;

import com.scribere.backend.dto.ArticleDto;
import com.scribere.backend.service.ArticleService;
import lombok.RequiredArgsConstructor;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ArticleController {
    private final ArticleService articleService;

    /**
     * Lists articles, optionally filtered by tag.
     *
     * @param pageable Pagination information
     * @return A page of article DTOs
     */
    @GetMapping("/articles")
    public Page<ArticleDto> list(@RequestParam(required = false) Pageable pageable) {
        return articleService.findAll(pageable);
    }

    /**
     * Lists articles filtered by a specific tag.
     *
     * @param tag      The tag to filter by
     * @param pageable Pagination information
     * @return A page of article DTOs
     */
    @GetMapping("/articles/tag/{tag}")
    public Page<ArticleDto> listByTag(@PathVariable String tag, Pageable pageable) {
        return articleService.findByTag(pageable, tag);
    }

    /**
     * Retrieves a single article by its id.
     * 
     * @param id The id of the article
     * @return The article DTO
     */
    @GetMapping("/articles/{id}")
    public ResponseEntity<ArticleDto> get(@PathVariable UUID id) {
        return articleService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Creates a new article.
     *
     * @param articleDto The article data transfer object
     * @return The created article
     */
    @PostMapping("/articles")
    public ResponseEntity<ArticleDto> create(@RequestBody ArticleDto articleDto) {
        ArticleDto savedArticle = articleService.save(articleDto);
        return ResponseEntity.ok(savedArticle);
    }
}
