import { getTrackById, getTracks } from "#db/queries/tracks";
import express from "express";

const tracksRouter = express.Router();
export default tracksRouter;

// GET /tracks
tracksRouter.route("/").get(async (req, res) => {
  const tracks = await getTracks();

  res.send(tracks);
});

// GET /tracks/:id
tracksRouter.route("/:id").get(async (req, res) => {
  if (isNaN(req.params.id)) {
    return res.status(400).send("The track ID must be a number");
  }

  const track = await getTrackById(req.params.id);
  if (!track) {
    return res.status(404).send("Track not found");
  }

  res.send(track);
});
