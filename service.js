const axios = require('axios');
const CONFIG = require('./config');


function requestApi(url){
    return axios.get(url);
}

const service = {
    getDefinition : function(word){
        let apiUrl      = CONFIG.API_URL.BASE_URL +'word/' + word + CONFIG.API_URL.DEFINITIONS + CONFIG.API_KEY;
        return requestApi(apiUrl)
        // return deferred;
    },
    getSynonyms: function(word){
        let apiUrl      = CONFIG.API_URL.BASE_URL + word + CONFIG.API_URL.SYNONYMS + CONFIG.API_KEY,
            deferred    = requestApi(apiUrl);
        return deferred;
    },
    getAntonyms: function(word){
        let apiUrl      = CONFIG.API_URL.BASE_URL + word + CONFIG.API_URL.ANTONYMS + CONFIG.API_KEY,
            deferred    = requestApi(apiUrl);
        return deferred;
    },  
    getRelatedWords: function(word){
        let apiUrl      = CONFIG.API_URL.BASE_URL+ 'word/' + word + CONFIG.API_URL.RELATED + CONFIG.API_KEY;
        console.log(apiUrl);
    },
    getExamples: function(word){
        let apiUrl      = CONFIG.API_URL.BASE_URL + word + CONFIG.API_URL.EXAMPLES + CONFIG.API_KEY,
            deferred    = requestApi(apiUrl);
        return deferred;    
    },
    getWordOfTheDay: function(){
        let currentDate  = (new Date()).toISOString().slice(0,10),
            apiUrl       = CONFIG.API_URL.WORD_OF_THE_DAY_PRE + currentDate
                           + CONFIG.API_URL.WORD_OF_THE_DAY_POST + CONFIG.API_KEY,
            deferred     = requestApi(apiUrl);
        return deferred;
    },
    getRandomWord: function(){
        let apiUrl      = CONFIG.API_URL.BASE_URL + CONFIG.API_URL.RANDOM_WORD + CONFIG.API_KEY;
        console.log(apiUrl);
    }
}

service.getDefinition('natural').then(result=>{
    console.log(result.data);
});