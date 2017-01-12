CREATE TABLE category(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
	name VARCHAR(128) NOT NULL
);

CREATE TABLE note(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
	category_id INTEGER NOT NULL,
	title VARCHAR(512) NOT NULL,
	content TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (category_id) REFERENCES category(id)
);

INSERT INTO category (name) VALUES
('ensimmäinen kategoria'), ('toinen kategoria');

INSERT INTO note (category_id, title, content) VALUES
(1, 'Lipuke1', 'Tekstisisältöä'),
(2, 'Lipuke2', 'pitäisi kuulua toiseen luokkaan'),
(1, 'Lipuke3', '');
