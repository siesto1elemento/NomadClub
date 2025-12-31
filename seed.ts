import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse';
import { db } from './db';

async function loadCSV() {
  const asset = Asset.fromModule(require('../assets/places.csv'));
  await asset.downloadAsync();
  return FileSystem.readAsStringAsync(asset.localUri!);
}

export async function seedDatabase() {
  const csv = await loadCSV();

  const parsed = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
  });

  db.execSync('BEGIN TRANSACTION');

  const stmt = db.prepareSync(`
    INSERT INTO places (
      title, country, region, subregion,
      rent, groceries,
      food_outside, base_cost, cheapest, most_expensive,
      wifi_download, wifi_upload, wifi_score,
      safety_index, safety_day, safety_night, crime_index,
      coffee_culture, food_scene, cleanliness, coworking,
      power, cafes, green_spaces, mountains,
      nomad_community, walkability, transit, bikeability,
      background_image, url
    ) VALUES (
      ?,?,?,?,
      ?,?,
      ?,?,?,?,
      ?,?,?,
      ?,?,?,?,
      ?,?,?,?,
      ?,?,?,?,
      ?,?,?,?,
      ?,?
    )
  `);

  for (const r of parsed.data as any[]) {
    stmt.executeSync([
      r.title,
      r.country,
      r.region,
      r.subregion,
      Number(r.rent),
      Number(r.groceries),
      r.food_outside,
      r.base_cost,
      r.cheapest,
      r.most_expensive,
      r.wifi_download,
      r.wifi_upload,
      r.wifi_,
      r.safety_index,
      r.safety_day,
      r.safety_night,
      r.crime_index,
      r.coffee_culture,
      r.food_scene,
      r.cleanliness,
      r.coworking,
      r.power,
      r.cafes,
      r.green_spaces,
      r.mountains,
      r.nomad_community,
      r.walkability,
      r.transit,
      r.bikeability,
      r.background_image,
      r.url,
    ]);
  }

  stmt.finalizeSync();
  db.execSync('COMMIT');
}
