package com.scribere.backend.controller;

import com.scribere.backend.dto.ArticleDto;
import com.scribere.backend.mapper.ArticleMapper;
import com.scribere.backend.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ArticleController {

    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;

    @GetMapping("/articles")
    public Page<ArticleDto> list(Pageable pageable) {
        return articleRepository.findAllByOrderByCreatedAtDesc(pageable)
                .map(articleMapper::toDto);
    }
}
