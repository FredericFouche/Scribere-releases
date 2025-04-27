package com.scribere.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import com.scribere.backend.dto.TagDto;
import com.scribere.backend.service.TagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TagController {
    private final TagService tagService;

    @GetMapping("/tags")
    public List<TagDto> list() {
        return tagService.findAll();
    }

    @GetMapping("/tags/{name}")
    public List<TagDto> findByName(String name) {
        return tagService.findByName(name);
    }

    @GetMapping("/tags/{slug}")
    public List<TagDto> findBySlug(String slug) {
        return tagService.findBySlug(slug);
    }

    @GetMapping("/tags/{id}")
    public TagDto findById(UUID id) {
        return tagService.findById(id);
    }

    @PostMapping("/tags")
    public ResponseEntity<TagDto> create(TagDto tagDto) {
        TagDto savedTag = tagService.save(tagDto);
        return ResponseEntity.ok(savedTag);
    }
}
