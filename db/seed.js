import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createPlaylist } from "./queries/playlists.js";
import { createPlayListTrack } from "./queries/playlists_tracks.js";
import { createTrack } from "./queries/tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // Seed Playlists
  for (let i = 0; i < 10; i++) {
    const playlistTemp = {
      name: faker.music.album(),
      description: faker.word.words({ count: { min: 3, max: 15 } }),
    };
    await createPlaylist(playlistTemp);
  }

  // Seed Tracks
  for (let j = 0; j < 20; j++) {
    const trackTemp = {
      name: faker.music.songName(),
      duration_ms: faker.number.int({ min: 1024, max: 50000 }),
    };
    await createTrack(trackTemp);
  }

  // Seed Playlists_Tracks
  for (let i = 1; i <= 15; i++) {
    let playlistId = 1 + Math.floor(Math.random() * 10);
    let trackId = 1 + Math.floor(Math.random() * 20);

    await createPlayListTrack({ playlistId, trackId });
  }
}
