package com.scribere.backend.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scribere.backend.dto.TagDto;
import com.scribere.backend.service.TagService;

@RestController
@RequestMapping("/api/tags")
public class TagController {
    private final TagService tagService;
    
    public TagController(TagService tagService) {
        this.tagService = tagService;
    }

    /**
     * Retrieves all tags.
     * 
     * @return a list of TagDto objects
     */
    @GetMapping
    public List<TagDto> list() {
        return tagService.findAll();
    }

    /**
     * Finds tags by name.
     * 
     * @param name the tag name to search
     * @return a list of TagDto objects
     */
    @GetMapping("/{name}")
    public List<TagDto> findByName(@PathVariable String name) {
        return tagService.findByName(name);
    }

    /**
     * Finds tags by slug.
     * 
     * @param slug the slug to search
     * @return a list of TagDto objects
     */
    @GetMapping("/{slug}")
    public List<TagDto> findBySlug(@PathVariable String slug) {
        return tagService.findBySlug(slug);
    }

    /**
     * Finds a specific tag by its UUID.
     * 
     * @param id the tag identifier
     * @return the matching TagDto object
     */
    @GetMapping("/{id}")
    public TagDto findById(@PathVariable UUID id) {
        return tagService.findById(id);
    }

    /**
     * Suggests tags matching a given prefix.
     * 
     * @param query the prefix
     * @return a list of TagDto objects
     */
    @GetMapping("/suggest")
    public ResponseEntity<List<TagDto>> suggestTags(@RequestParam("q") String query) {
        List<TagDto> suggestions = tagService.suggestByPrefix(query);
        return ResponseEntity.ok(suggestions);
    }

    /**
     * Creates a new tag.
     * 
     * @param tagDto the DTO with tag info
     * @return the created TagDto
     */
    @PostMapping
    public ResponseEntity<TagDto> create(@RequestBody TagDto tagDto) {
        TagDto savedTag = tagService.save(tagDto);
        return ResponseEntity.ok(savedTag);
    }
}
