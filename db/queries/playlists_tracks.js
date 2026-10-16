import db from "#db/client";

export async function createPlayListTrack({ playlistId, trackId }) {
  const sql = `
  INSERT INTO playlists_tracks
    (playlist_id, track_id)
  VALUES
    ($1, $2)
  RETURNING *
  `;

  const {
    rows: [playlistTrack],
  } = await db.query(sql, [playlistId, trackId]);

  return playlistTrack;
}

// Get all tracks from a playlist by PlaylistID
export async function getTracksByPlaylistId(id) {
  const sql = `
        SELECT tracks.*
        FROM playlists_tracks
        JOIN tracks ON playlists_tracks.track_id = tracks.id
        WHERE playlists_tracks.playlist_id = $1
    `;

  const { rows: tracks } = await db.query(sql, [id]);

  return tracks;
}

// Get track from a playlist by
export async function getTrackByPlaylistId(playlistId, trackId) {
  const sql = `
        SELECT tracks.*
        FROM playlists_tracks
        JOIN tracks ON playlists_tracks.track_id = tracks.id
        WHERE playlists_tracks.playlist_id = $1
            AND playlists_tracks.track_id = $2
    `;

  const {
    rows: [track],
  } = await db.query(sql, [playlistId, trackId]);

  return track;
}
