#!/usr/bin/node
const request = require('request');
const movieId = process.argv[2];

if (!movieId) {
  console.error('Usage: ./0-starwars_characters.js <movieId>');
  process.exit(1);
}
const url = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

let people = [];
const names = [];

const requestCharacters = async () => {
  await new Promise(resolve => request(url, (err, res, body) => {
    if (err || res.statusCode !== 200) {
      console.error('Error: ', err, '| StatusCode: ', res.statusCode);
    } else {
      const jsonBody = JSON.parse(body);
      people = jsonBody.characters;
      resolve();
    }
  }));
};

const requestNames = async () => {
  if (people.length > 0) {
    for (const p of people) {
      await new Promise(resolve => request(p, (err, res, body) => {
        if (err || res.statusCode !== 200) {
          console.error('Error: ', err, '| StatusCode: ', res.statusCode);
        } else {
          const jsonBody = JSON.parse(body);
          names.push(jsonBody.name);
          resolve();
        }
      }));
    }
  } else {
    console.error('Error: Got no Characters for some reason');
  }
};

const getCast = async () => {
  await requestCharacters();
  await requestNames();

  for (const i of filmCast) {
    if (i === filmCast[filmCast.length - 1]) {
      process.stdout.write(n);
    } else {
      process.stdout.write(n + '\n');
    }
  }
};

getCast();