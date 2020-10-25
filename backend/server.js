"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
// "debugged" as it was missing body parser before
const bodyParser = require("body-parser");
const { top50 } = require("./data/top50");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(bodyParser.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇

  // create an endpoint that
  // will respond to get requests for data.
  // will serve up all of the song data in /backend/data/top50.js.
  .get("/top50", (req, res) => {
    const data = top50;

    res.status(200).json({
      status: 200,
      // send the data back as a result
      data,
    });
  })

  // create an endpoint that will respond with a specific song, based on the rank provided in the URL
  .get("/top50/song/:id", (req, res) => {
    // create a variable to represent the url params
    // params will always produce a string (i.e. 4 returns "4")
    const songRank = req.params.id;
    // create a variable that holds a function that returns the song rank referenced by the url id
    const data = top50.find((song) => song.rank.toString() === songRank);

    // if the url params id succeeds in returning a ranked song in the array (1-50) return the data
    if (data) {
      res.status(200).json({
        status: 200,
        data,
      });
      // if the url params doesn't succeed in returning a ranked song in the array return "song not found"
    } else {
      res.status(400).json({
        status: 404,
        message: "Song not found.",
      });
    }
  })

  // create an endpoint that will reposnd with all of the songs by a specific artist (provided in the URL)
  .get("/top50/artist/:id", (req, res) => {
    // create a variable to represent the artist name provided in the URL (id)
    const songArtist = req.params.id;
    // create a variable that returns a new array containing only the songs by a specified artist
    const data = top50.filter((song) => {
      return song.artist.toLowerCase().includes(songArtist.toLowerCase());
    });
    // if there is at least one song returned, return data
    if (data.length > 0) {
      res.status(200).json({
        status: 200,
        data,
      });
      // otherwise return song not found
    } else {
      res.status(400).json({
        status: 404,
        message: "Song not found.",
      });
    }
  })

  // create an endpoint that will analyze the top50 data
  // and return the songs of the most popular artist (the artist with the most songs in the top 50.)
  .get("/top50/popular-artist", (req, res) => {
    // create an array that is just mage up of the artist names from the original array
    const artistArray = top50.map((song) => song.artist);
    // use reduce to create an object with the names of the artists as keys
    // and the number of times they occured in the artistArray as values
    const reducedObject = artistArray.reduce((acc, artist) => {
      if (!acc[artist]) {
        acc[artist] = 1;
      } else {
        acc[artist] += 1;
      }
      return acc;
    }, {});

    // create an array of the keys in reducedObject
    const artistName = Object.keys(reducedObject);
    // create an array of the values in reducedObject
    const numberOfSongs = Object.values(reducedObject);
    // create a variable to represent the maxSong
    let maxSong = 0;
    // create a variable to represent the maxSong index
    let maxSongIndex = null;

    // for each artist's numberOfSongs
    // check to see if the number of songs that they have in the top50 is greater than maxSong
    numberOfSongs.forEach((song, index) => {
      // if the number of songs is greater than maxSong
      if (song > maxSong) {
        // let maxSong equal that number
        maxSong = song;
        // let maxSong index equal that number's index
        maxSongIndex = index;
      }
    });
    // create a variable for the most popular artist
    // that references the artistName array using the maxSongIndex in the numberOfSongs array
    const mostPopularArtist = artistName[maxSongIndex];

    // create a variable called data that will represent the songs by the mostPopularArtist that are found in the top50
    const data = top50.filter((song) => {
      return song.artist.toLowerCase() === mostPopularArtist.toLowerCase();
    });
    // send that data to the front end
    res.status(200).json({
      status: 200,
      data,
    });
  })

  // create an endpoint /top50/artist that provides an array of all of the artists in the top 50
  .get("/top50/artist", (req, res) => {
    // create a variable for data and assign it the value of an empty array
    const data = [];
    // create an artistArray that maps over the top 50 array, referenced the artist keys to avoid reproducing them
    const artistArray = top50.map((song) => song.artist);
    function artistSet(artist, set) {
      data.push(artist);
    }
    new Set(artistArray).forEach(artistSet);
    res.status(200).json({
      status: 200,
      data,
    });
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
