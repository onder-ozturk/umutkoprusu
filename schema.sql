CREATE TABLE IF NOT EXISTS suggestions (
  id TEXT PRIMARY KEY,
  itemText TEXT NOT NULL,
  category TEXT NOT NULL,
  period TEXT NOT NULL,
  suggestion TEXT NOT NULL,
  timestamp INTEGER NOT NULL
);
