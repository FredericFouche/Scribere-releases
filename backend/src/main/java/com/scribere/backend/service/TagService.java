package com.scribere.backend.service;

import com.scribere.backend.model.Tag;
import com.scribere.backend.repository.TagRepository;
import com.scribere.backend.mapper.TagMapper;
import com.scribere.backend.dto.TagDto;

import java.util.List;
import java.util.UUID;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

@Service
public class TagService {
    private final TagRepository tagRepository;
    private final TagMapper tagMapper;
    private final ApplicationEventPublisher eventPublisher;

    /**
     * Constructs a new TagService.
     *
     * @param tagRepository  Injected TagRepository.
     * @param tagMapper      Injected TagMapper for converting Tag entities and
     *                       DTOs.
     * @param eventPublisher Injected ApplicationEventPublisher for publishing
     *                       events.
     */
    public TagService(TagRepository tagRepository, TagMapper tagMapper, ApplicationEventPublisher eventPublisher) {
        this.tagRepository = tagRepository;
        this.tagMapper = tagMapper;
        this.eventPublisher = eventPublisher;
    }

    /**
     * Saves a tag and publishes an event.
     *
     * @param tagDto Tag to save.
     * @return The saved tag DTO.
     */
    public TagDto save(TagDto tagDto) {
        Tag tag = tagMapper.toEntity(tagDto);
        tag = tagRepository.save(tag);
        TagDto savedTagDto = tagMapper.toDto(tag);
        eventPublisher.publishEvent(savedTagDto);
        return savedTagDto;
    }

    /**
     * Finds tags by name.
     *
     * @param name The name to search for.
     * @return A list of matching TagDto objects.
     */
    public List<TagDto> findByName(String name) {
        List<Tag> tags = tagRepository.findByName(name);
        return tags.stream().map(tagMapper::toDto).toList();
    }

    /**
     * Finds tags by slug.
     *
     * @param slug The slug to search for.
     * @return A list of matching TagDto objects.
     */
    public List<TagDto> findBySlug(String slug) {
        List<Tag> tags = tagRepository.findBySlug(slug);
        return tags.stream().map(tagMapper::toDto).toList();
    }

    /**
     * Finds all tags.
     *
     * @return A list of all TagDto objects.
     */
    public List<TagDto> findAll() {
        List<Tag> tags = tagRepository.findAll();
        return tags.stream().map(tagMapper::toDto).toList();
    }

    /**
     * Finds a tag by its ID.
     *
     * @param id The UUID of the tag.
     * @return The matching TagDto object.
     */
    public TagDto findById(UUID id) {
        Tag tag = tagRepository.findById(id).orElseThrow(() -> new RuntimeException("Tag not found"));
        return tagMapper.toDto(tag);
    }

    /**
     * Deletes a tag by its ID.
     *
     * @param id The UUID of the tag to delete.
     */
    public void deleteById(UUID id) {
        tagRepository.deleteById(id);
    }

    /**
     * Suggests tags by prefix.
     *
     * @param prefix The prefix string (case-insensitive).
     * @return A list of TagDto objects that start with the prefix.
     */
    public List<TagDto> suggestByPrefix(String prefix) {
        List<Tag> tags = tagRepository.findByNameStartingWithIgnoreCase(prefix);
        return tags.stream().map(tagMapper::toDto).toList();
    }
}
