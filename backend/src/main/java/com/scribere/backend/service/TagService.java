package com.scribere.backend.service;

import com.scribere.backend.model.Tag;
import com.scribere.backend.repository.TagRepository;
import com.scribere.backend.mapper.TagMapper;
import com.scribere.backend.dto.TagDto;

import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TagService {
    private static final Logger logger = LoggerFactory.getLogger(ArticleService.class);
    private final TagRepository tagRepository;
    private final TagMapper tagMapper;
    private final ApplicationEventPublisher eventPublisher;

    public TagService(TagRepository tagRepository, TagMapper tagMapper, ApplicationEventPublisher eventPublisher) {
        this.tagRepository = tagRepository;
        this.tagMapper = tagMapper;
        this.eventPublisher = eventPublisher;
    }

    public TagDto save(TagDto tagDto) {
        logger.info("Saving tag: {}", tagDto.getName());

        // Convertir le DTO en entité
        Tag tag = tagMapper.toEntity(tagDto);

        // Sauvegarder le tag
        tag = tagRepository.save(tag);

        // Convertir l'entité sauvegardée en DTO
        TagDto savedTagDto = tagMapper.toDto(tag);

        // Publier l'événement pour l'indexation
        logger.info("Publishing TagSavedEvent for tag: {}", savedTagDto.getName());
        eventPublisher.publishEvent(savedTagDto);

        return savedTagDto;
    }

    public List<TagDto> findByName(String name) {
        logger.info("Finding tags by name: {}", name);
        List<Tag> tags = tagRepository.findByName(name);
        return tags.stream().map(tagMapper::toDto).toList();
    }

    public List<TagDto> findBySlug(String slug) {
        logger.info("Finding tags by slug: {}", slug);
        List<Tag> tags = tagRepository.findBySlug(slug);
        return tags.stream().map(tagMapper::toDto).toList();
    }

    public List<TagDto> findAll() {
        logger.info("Finding all tags");
        List<Tag> tags = tagRepository.findAll();
        return tags.stream().map(tagMapper::toDto).toList();
    }

    public TagDto findById(UUID id) {
        logger.info("Finding tag by ID: {}", id);
        Tag tag = tagRepository.findById(id).orElseThrow(() -> new RuntimeException("Tag not found"));
        return tagMapper.toDto(tag);
    }

    public void deleteById(UUID id) {
        logger.info("Deleting tag by ID: {}", id);
        tagRepository.deleteById(id);
    }

    public List<TagDto> suggestByPrefix(String prefix) {
        logger.info("Suggesting tags with prefix: {}", prefix);
        List<Tag> tags = tagRepository.findByNameStartingWithIgnoreCase(prefix);
        return tags.stream().map(tagMapper::toDto).toList();
    }
}
