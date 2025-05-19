# Backend structure

# The backend is structured as follows:

```text
├───java
│   └───com
│       └───scribere
│           │   App.java
│           │
│           └───backend
│               ├───config
│               │       CorsConfig.java
│               │       FlywayConfig.java
│               │       MeilisearchConfig.java
│               │       WebConfig.java
│               │
│               ├───controller
│               │       ArticleController.java
│               │       SearchController.java
│               │       TagController.java
│               │       UserController.java
│               │
│               ├───dto
│               │       ArticleDto.java
│               │       TagDto.java
│               │       UserDto.java
│               │
│               ├───event
│               │       ArticleSavedEvent.java
│               │
│               ├───listener
│               │       ArticleIndexingListener.java
│               │
│               ├───mapper
│               │       ArticleMapper.java
│               │       TagMapper.java
│               │       UserMapper.java
│               │
│               ├───model
│               │       Article.java
│               │       Tag.java
│               │       User.java
│               │
│               ├───repository
│               │       ArticleRepository.java
│               │       TagRepository.java
│               │       UserRepository.java
│               │
│               └───service
│                       ArticleService.java
│                       SearchService.java
│                       TagService.java
│                       UserService.java
│
└───resources
    │   application.properties
    │
    └───db
        └───migration
                V1__create_article.sql
                V2__create_tags.sql
                V3__insert_seeding.sql
                V4__create_user.sql
```


