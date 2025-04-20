CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  html_body TEXT NOT NULL,
  read_time INTEGER NOT NULL,
  cover_img_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
