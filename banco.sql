DROP DATABASE IF EXISTS trabalho;
CREATE DATABASE trabalho;
USE trabalho;

CREATE TABLE tarefa (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR (100) NOT NULL,
description VARCHAR (100) NOT NULL,
status ENUM ('pendente', 'entregue', 'atrasado') NOT NULL DEFAULT 'pendente',
created_at TIMESTAMP DEFAULT current_timestamp
);