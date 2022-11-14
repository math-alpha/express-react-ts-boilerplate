CREATE DATABASE IF NOT EXISTS nano_dev;
USE nano_dev;

CREATE TABLE IF NOT EXISTS transactions(
    id text primary key,
    value integer not null,
    timestamp integer,
    sender text not null,
    receiver text not null,
    confirmed boolean default false,
);
