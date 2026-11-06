// Favorites SQLite database service

import * as SQLite from 'expo-sqlite';

export interface Favorite {
  id: number;
  name: string;
  created_at: number;
}

let db: SQLite.SQLiteDatabase | null = null;

/**
 * Initialize the favorites database
 * Call this once at app startup
 */
export async function initDatabase(): Promise<void> {
  db = await SQLite.openDatabaseAsync('pokedex.db');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
  `);
}

/**
 * Get the database instance
 * Throws if database not initialized
 */
function getDb(): SQLite.SQLiteDatabase {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

/**
 * Get all favorites, newest first
 */
export async function getAllFavorites(): Promise<Favorite[]> {
  const database = getDb();
  const result = await database.getAllAsync<Favorite>(
    'SELECT * FROM favorites ORDER BY created_at DESC',
  );
  return result;
}

/**
 * Check if a Pokemon is favorited
 */
export async function isFavorite(id: number): Promise<boolean> {
  const database = getDb();
  const result = await database.getFirstAsync<{ count: number }>(
    'SELECT COUNT(*) as count FROM favorites WHERE id = ?',
    [id],
  );
  return (result?.count ?? 0) > 0;
}

/**
 * Add a Pokemon to favorites
 */
export async function addFavorite(id: number, name: string): Promise<void> {
  const database = getDb();
  const createdAt = Date.now();
  await database.runAsync(
    'INSERT OR REPLACE INTO favorites (id, name, created_at) VALUES (?, ?, ?)',
    [id, name, createdAt],
  );
}

/**
 * Remove a Pokemon from favorites
 */
export async function removeFavorite(id: number): Promise<void> {
  const database = getDb();
  await database.runAsync('DELETE FROM favorites WHERE id = ?', [id]);
}
