package com.scribere.backend.controller;

import com.scribere.backend.dto.ArticleDto;
import com.scribere.backend.mapper.ArticleMapper;
import com.scribere.backend.repository.ArticleRepository;
import com.scribere.backend.service.ArticleService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;
    private final ArticleService articleService;

    @GetMapping("/articles")
    public Page<ArticleDto> list(
            @RequestParam(required = false) String tag,
            Pageable pageable) {

        if (tag != null && !tag.isEmpty()) {
            return articleService.findByTagSlug(tag, pageable);
        } else {
            return articleRepository.findAllByOrderByCreatedAtDesc(pageable)
                    .map(articleMapper::toDto);
        }
    }

    @PostMapping("/articles")
    public ResponseEntity<ArticleDto> create(@RequestBody ArticleDto articleDto) {
        ArticleDto savedArticle = articleService.save(articleDto);
        return ResponseEntity.ok(savedArticle);
    }
}
