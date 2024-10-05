const prompts = require('prompts');
const api = require('./api.js');
const history = require('./history.js');
const {updateSearchResults} = require("./history");

// select anime from list to display details for
const _selectAnime = async (animes) => {
    const displayAnimes = animes.map((anime) => {
        return { title: `${anime.node.title}`, value: anime.node.id };
    });

    return await prompts([
        {
            type: 'select',
            name: 'anime',
            message: 'Select anime to show its details',
            choices: displayAnimes
        }
    ]);
}

const searchAnime = async (args) => {
    // get keyword user wanted to search for
    const keyword = args.keyword;
    // get search results
    const animeList = await api.getAnimeList(keyword);
    // get number of results returned
    const numResults = animeList.data.length
    // save keyword and number of results to json file
    const searchResults = history.updateSearchResults(keyword, numResults);
    // prompt the user to select anime
    const selectedAnime = await _selectAnime(animeList.data);
    // fetch details of selected anime
    const selectedAnimeDetails = await api.getAnimeDetails(selectedAnime.anime);
    console.log(`Title: ${selectedAnimeDetails.title}\nID: ${selectedAnimeDetails.id}\nDates: ${selectedAnimeDetails.start_date} - ${selectedAnimeDetails.end_date}\nStatus:${selectedAnimeDetails.status}\nNumber of episodes: ${selectedAnimeDetails.num_episodes}\nRank: ${selectedAnimeDetails.rank}\nSynopsis: ${selectedAnimeDetails.synopsis.trim()}`);
};


module.exports = {
    searchAnime
};
