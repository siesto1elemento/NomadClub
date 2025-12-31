import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
import * as SQLite from 'expo-sqlite';
import { setDB } from './db';

const DB_NAME = 'places.db';

export async function initDB() {
  const sqliteDir = `${FileSystem.documentDirectory}SQLite`;
  const dbPath = `${sqliteDir}/${DB_NAME}`;

  // Ensure SQLite directory exists
  const dirInfo = await FileSystem.getInfoAsync(sqliteDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(sqliteDir, { intermediates: true });
  }

  // Copy DB from assets if it does not exist
  const dbInfo = await FileSystem.getInfoAsync(dbPath);
  if (!dbInfo.exists) {
    const asset = Asset.fromModule(
      require('./assets/databases/places.db')
    );
    await asset.downloadAsync();

    await FileSystem.copyAsync({
      from: asset.localUri!,
      to: dbPath,
    });
  }

  // Now open the REAL database
  const database = SQLite.openDatabaseSync(DB_NAME);
  setDB(database);

  return database;
}
