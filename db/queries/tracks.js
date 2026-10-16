import db from "#db/client";

export async function createTrack({ name, duration_ms }) {
  const sql = `
        INSERT INTO tracks
            (name, duration_ms)
        VALUES
            ($1, $2)
        RETURNING *
    `;

  const {
    rows: [track],
  } = await db.query(sql, [name, duration_ms]);

  return track;
}

// Get ALL tracks
export async function getTracks() {
  const sql = `
        SELECT *
        FROM tracks
    `;

  const { rows: tracks } = await db.query(sql);

  return tracks;
}

// Get track by ID
export async function getTrackById(id) {
  const sql = `
        SELECT *
        FROM tracks
        WHERE id = $1
    `;

  const {
    rows: [track],
  } = await db.query(sql, [id]);

  return track;
}
