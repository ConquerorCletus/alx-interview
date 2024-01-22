#!/usr/bin/node
const request = require('request');
const movieId = process.argv[2];

if (!movieId) {
  console.error('Usage: ./0-starwars_characters.js <movieId>');
  process.exit(1);
}
const url = `https://swapi-api.alx-tools.com/api/films/${movieId}/`;

let people = [];
const filmCast = [];

const requestCharacters = async () => {
  try {
    await new Promise((resolve, reject) => {
      request(url, (err, res, body) => {
        if (err || (res && res.statusCode !== 200)) {
          console.error('Error: ', err, '| StatusCode: ', res ? res.statusCode : 'unknown');
          reject(err);
        } else {
          const jsonBody = JSON.parse(body);
          people = jsonBody.characters;
          resolve();
        }
      });
    });
  } catch (error) {
    console.error('Error requesting characters: ', error);
  }
};

const requestNames = async () => {
  if (people.length > 0) {
    for (const p of people) {
      try {
        await new Promise((resolve, reject) => {
          request(p, (err, res, body) => {
            if (err || (res && res.statusCode !== 200)) {
              console.error('Error: ', err, '| StatusCode: ', res ? res.statusCode : 'unknown');
              reject(err);
            } else {
              const jsonBody = JSON.parse(body);
              filmCast.push(jsonBody.name);
              resolve();
            }
          });
        });
      } catch (error) {
        console.error('Error requesting names: ', error);
      }
    }
  } else {
    console.error('Error: Got no Characters for some reason');
  }
};

const getCast = async () => {
  try {
    await requestCharacters();
    await requestNames();

    for (const i of filmCast) {
      if (i === filmCast[filmCast.length - 1]) {
        process.stdout.write(i);
      } else {
        process.stdout.write(i + '\n');
      }
    }
  } catch (error) {
    console.error('Error: ', error);
  }
};

getCast();
