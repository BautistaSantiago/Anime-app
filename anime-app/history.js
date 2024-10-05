const fs = require('fs');

const updateSearchResults = (search, numResults) => {
    const searchData = {
        keyword: search,
        results: numResults
    };
    // read data from history.json if it exists
    let historyData = [];
    if (fs.existsSync('history.json')) {
        const jsonData = fs.readFileSync('history.json');
        historyData = JSON.parse(jsonData);
    }
    // add new entry to history array
    historyData.push(searchData);
    // convert to JSON
    const jsonData = JSON.stringify(historyData);
    // save to JSON file
    fs.writeFile('history.json', jsonData, (err) => {
        if (err) {
            console.error(err);
            return false;
        }
    });
    return true;
}

module.exports = {
    updateSearchResults
};