package com.scribere.backend.dto;

import lombok.Data;
import java.util.UUID;
import java.time.LocalDateTime;

@Data
public class TagDto {
    private UUID id;
    private String name;
    private String slug;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
