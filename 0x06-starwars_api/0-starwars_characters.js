#!/usr/bin/node
const request = require('request');
const movieId = process.argv[2];

if (!movieId) {
    console.error('Usage: ./0-starwars_characters.js <movieId>');
    process.exit(1);
}

const url = `https://swapi.dev/api/films/${movieId}/`;

request(url, (error, response, body) => {
    if (error) {
        console.error('Error:', error);
        process.exit(1);
    }

    if (response.statusCode !== 200) {
        console.error('Failed to retrieve movie information. Status code:', response.statusCode);
        process.exit(1);
    }

    const movieData = JSON.parse(body);
    const castUrls = movieData.characters;

    // Make requests to character URLs to get names
    castUrls.forEach(characterUrl => {
        request(characterUrl, (error, response, body) => {
            if (error) {
                console.error('Error:', error);
                process.exit(1);
            }

            if (response.statusCode !== 200) {
                console.error('Failed to retrieve character information. Status code:', response.statusCode);
                process.exit(1);
            }

            const characterData = JSON.parse(body);
            console.log(characterData.name);
        });
    });
});