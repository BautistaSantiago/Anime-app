const superagent = require('superagent');
const base = 'https://api.myanimelist.net/v2/anime';

// search for anime and get a list of possible results
const getAnimeList = async (query) => {
    try {
        // https://api.myanimelist.net/v2/anime?q=<<query>>
        const animeSearchURL = `${base}?q=${query}`;
        const res = await superagent.get(animeSearchURL).set('X-MAL-CLIENT-ID', 'fef203e9bdd6704e0ae83a902914b300');
        return res.body;
    } catch (error) {
        console.log(error);
    }
};

// get the details of a specified anime
const getAnimeDetails = async (animeId) => {
    // https://api.myanimelist.net/v2/anime/<<animeID>>?fields=id,title,start_date,end_date,synopsis,rank,status,num_episodes
    try {
        const animeURL = `${base}/${animeId}?fields=id,title,start_date,end_date,synopsis,rank,status,num_episodes`;
        const res = await superagent.get(animeURL).set('X-MAL-CLIENT-ID', 'fef203e9bdd6704e0ae83a902914b300');
        return res.body;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAnimeList,
    getAnimeDetails
};