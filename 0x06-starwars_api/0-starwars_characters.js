#!/usr/bin/node
const request = require('request');
const movieId = process.argv[2];

if (!movieId) {
    console.error('Usage: ./0-starwars_characters.js <movieId>');
    process.exit(1);
}

const url = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

function apiRequest (cast, index) {
    if (cast.length === index) {
      return;
    }
  
    request(cast[index], (error, response, body) => {
      if (error) {
        console.log(error);
      } else {
        console.log(JSON.parse(body).name);
        apiRequest(cast, index + 1);
      }
    });
  }
  
  request(url, (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      const cast = JSON.parse(body).characters;
  
      apiRequest(cast, 0);
    }
  });