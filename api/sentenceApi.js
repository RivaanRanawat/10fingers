const axios = require("axios");

const getSentence = async () => {
    const jokeData = await axios.get("https://icanhazdadjoke.com/", {
        headers: {
            "Accept": "application/json"
        }
    })

    return jokeData.data.joke
}

module.exports = getSentence;
