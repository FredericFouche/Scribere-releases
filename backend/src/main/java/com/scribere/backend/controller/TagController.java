package com.scribere.backend.controller;

import org.springframework.web.bind.annotation.RestController;
import com.scribere.backend.dto.TagDto;
import com.scribere.backend.service.TagService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tags")
@RequiredArgsConstructor
public class TagController {
    private final TagService tagService;

    @GetMapping
    public List<TagDto> list() {
        return tagService.findAll();
    }

    @GetMapping("/name/{name}")
    public List<TagDto> findByName(@PathVariable String name) {
        return tagService.findByName(name);
    }

    @GetMapping("/slug/{slug}")
    public List<TagDto> findBySlug(@PathVariable String slug) {
        return tagService.findBySlug(slug);
    }

    @GetMapping("/id/{id}")
    public TagDto findById(@PathVariable UUID id) {
        return tagService.findById(id);
    }

    @GetMapping("/suggest")
    public ResponseEntity<List<TagDto>> suggestTags(@RequestParam("q") String query) {
        List<TagDto> suggestions = tagService.suggestByPrefix(query);
        return ResponseEntity.ok(suggestions);
    }

    @PostMapping
    public ResponseEntity<TagDto> create(@RequestBody TagDto tagDto) {
        TagDto savedTag = tagService.save(tagDto);
        return ResponseEntity.ok(savedTag);
    }
}
