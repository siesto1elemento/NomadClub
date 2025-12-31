import * as SQLite from 'expo-sqlite';

export let db: SQLite.SQLiteDatabase | null = null;

export function setDB(database: SQLite.SQLiteDatabase) {
  db = database;
}
