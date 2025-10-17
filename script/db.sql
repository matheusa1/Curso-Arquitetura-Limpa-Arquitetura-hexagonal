create extension if not exists "uuid-ossp";

create table usuarios (
    id uuid primary key,
    nome varchar(255) not null,
    email varchar(255) not null unique,
    senha varchar(255) not null
);