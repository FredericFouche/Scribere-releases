-- Insertion de plusieurs articles avec contenu HTML enrichi
INSERT INTO articles (id, title, slug, html_body, read_time, cover_img_url,
    created_at, updated_at)
VALUES 
  (uuid_generate_v4(), 'Découvrir Java en profondeur', 'decouvrir-java', 
  '<h1>Introduction à Java</h1><p>Java est l''un des langages de programmation les plus populaires au monde.</p><p>Créé par Sun Microsystems en 1995, il reste aujourd''hui incontournable.</p><h2>Pourquoi apprendre Java ?</h2><ul><li>Portabilité</li><li>Performance</li><li>Communauté active</li></ul><p>Que vous soyez débutant ou expérimenté, Java offre un cadre robuste pour vos projets.</p>', 
  7, NULL, now(), now()),

  (uuid_generate_v4(), 'Construire une API REST avec Spring Boot', 'api-rest-spring-boot', 
  '<h1>Introduction</h1><p>Spring Boot facilite le développement rapide d''applications Java autonomes et prêtes pour la production.</p><h2>Objectifs</h2><p>Dans cet article, nous allons :</p><ol><li>Configurer un projet Spring Boot</li><li>Créer des endpoints REST</li><li>Tester l''API avec Postman</li></ol><p>Suivez attentivement chaque étape !</p>', 
  8, NULL, now(), now()),

  (uuid_generate_v4(), 'Les bonnes pratiques du développement web', 'bonnes-pratiques-web', 
  '<h1>Optimiser vos sites</h1><p>Le développement web ne se limite pas au simple code HTML/CSS.</p><h2>Points essentiels</h2><ul><li>Accessibilité (a11y)</li><li>Performance (chargement rapide)</li><li>SEO (référencement naturel)</li><li>Responsive Design</li></ul><p>Chaque site devrait viser à offrir une expérience optimale aux utilisateurs, quel que soit leur appareil.</p>', 
  6, NULL, now(), now()),

  (uuid_generate_v4(), 'Introduction à Scribere', 'introduction-scribere', 
  '<h1>Bienvenue sur Scribere !</h1><p>Scribere est votre plateforme de publication d''articles.</p><h2>Pourquoi Scribere ?</h2><p>Notre mission est de vous aider à partager vos idées simplement, efficacement et de manière agréable à lire.</p><blockquote>La plume est plus forte que l''épée.</blockquote><p>Créez, publiez, inspirez !</p>', 
  4, NULL, now(), now()),
  
  (uuid_generate_v4(), 'Les bases de JavaScript', 'bases-javascript',
  '<h1>Introduction à JavaScript</h1><p>JavaScript est un langage de programmation essentiel pour le développement web.</p><h2>Pourquoi apprendre JavaScript ?</h2><ul><li>Interactivité</li><li>Manipulation du DOM</li><li>Frameworks populaires (React, Vue, Angular)</li></ul><p>JavaScript est incontournable pour tout développeur web.</p>',
  5, 'https://radicalhub.com/wp-content/uploads/2018/07/javascript.jpg' , now(), now());

-- Insertion de plusieurs tags avec gestion des doublons
INSERT INTO tags (id, name, slug, created_at, updated_at)
VALUES
  (uuid_generate_v4(), 'Java', 'java', now(), now()),
  (uuid_generate_v4(), 'Spring Boot', 'spring-boot', now(), now()),
  (uuid_generate_v4(), 'Tutoriel', 'tutoriel', now(), now()),
  (uuid_generate_v4(), 'Développement Web', 'developpement-web', now(), now()),
  (uuid_generate_v4(), 'Scribere', 'scribere', now(), now())
ON CONFLICT (slug) DO NOTHING;

-- Association Articles <-> Tags
WITH 
  article_ids AS (SELECT id, slug FROM articles WHERE slug IN ('decouvrir-java', 'api-rest-spring-boot', 'bonnes-pratiques-web', 'introduction-scribere')),
  tag_ids AS (SELECT id, slug FROM tags)

-- Associer chaque article à plusieurs tags pertinents
INSERT INTO article_tags (article_id, tag_id)
SELECT a.id, t.id
FROM article_ids a
JOIN tag_ids t ON 
  (a.slug = 'decouvrir-java' AND t.slug IN ('java', 'tutoriel')) OR
  (a.slug = 'api-rest-spring-boot' AND t.slug IN ('spring-boot', 'java', 'tutoriel')) OR
  (a.slug = 'bonnes-pratiques-web' AND t.slug IN ('developpement-web', 'tutoriel')) OR
  (a.slug = 'introduction-scribere' AND t.slug IN ('scribere', 'developpement-web'));