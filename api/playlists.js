import {
  createPlaylist,
  getPlaylistById,
  getPlaylists,
} from "#db/queries/playlists";
import {
  createPlayListTrack,
  getTrackByPlaylistId,
  getTracksByPlaylistId,
} from "#db/queries/playlists_tracks";
import { getTrackById } from "#db/queries/tracks";
import express from "express";

const playlistsRouter = express.Router();
export default playlistsRouter;

//  /playlists
playlistsRouter
  .route("/")
  .get(async (req, res) => {
    const playlists = await getPlaylists();

    res.send(playlists);
  })
  .post(async (req, res) => {
    console.log("req.body", req.body);
    if (!req.body) {
      return res.status(400).send("Please provide a request body");
    }

    const { name, description } = req.body;

    if (!name || !description) {
      return res
        .status(400)
        .send("Request body must have a name and description");
    }

    const playlist = await createPlaylist({ name, description });

    res.status(201).send(playlist);
  });

// Retrieve Param and playlist by id
playlistsRouter.param("id", async (req, res, next, id) => {
  if (isNaN(id)) {
    return res.status(400).send("The playlist ID must be a number");
  }

  const playlist = await getPlaylistById(id);

  if (!playlist) {
    return res.status(404).send("Playlist not found.");
  }

  req.playlist = playlist;
  next();
});

// /playlists/:id
playlistsRouter.route("/:id").get((req, res) => {
  res.send(req.playlist);
});

// /playlists/:id/tracks
playlistsRouter
  .route("/:id/tracks")
  .get(async (req, res) => {
    const tracks = await getTracksByPlaylistId(req.playlist.id);

    res.send(tracks);
  })
  .post(async (req, res) => {
    if (!req.body) {
      return res.status(400).send("Please provide a request body");
    }

    const { trackId } = req.body;

    if (!trackId) {
      return res.status(400).send("Request body must have a trackId");
    }

    if (isNaN(trackId)) {
      return res.status(400).send("trackId must be a number");
    }

    // Check if track exists
    const track = await getTrackById(trackId);
    if (!track) {
      return res.status(400).send(`Track with id ${trackId} not found`);
    }

    // Check if track exists in the playlist already
    const trackExist = await getTrackByPlaylistId(req.playlist.id, trackId);
    if (trackExist) {
      return res.status(400).send(`Track already exists in this playlist`);
    }

    const playlist_track = await createPlayListTrack({
      playlistId: req.playlist.id,
      trackId,
    });

    res.status(201).send(playlist_track);
  });
