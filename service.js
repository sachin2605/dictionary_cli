const axios = require('axios');
const CONFIG = require('./config');
const chalk = require('chalk');

async function requestApi(url){
    try{
        let data = await axios.get(url);
        return data;
    } catch(error){
        console.log(chalk.red(error.response.data.error));
        throw new Error(error);
    }
};

const service = {
    getRandomWord: async function(){
        let apiUrl      = CONFIG.API_URL.BASE_URL + CONFIG.API_URL.RANDOM_WORD + CONFIG.API_KEY;
        let res = await requestApi(apiUrl);
        return res.data.word;
    },
    getDefinition : async function(word){
        let apiUrl      = CONFIG.API_URL.BASE_URL +'word/' + word + CONFIG.API_URL.DEFINITIONS + CONFIG.API_KEY;
        let res =  await requestApi(apiUrl);
        return res.data;
    },
    getRelatedWords: async function(word){
        let apiUrl  =   CONFIG.API_URL.BASE_URL + 'word/' + word + CONFIG.API_URL.RELATED + CONFIG.API_KEY;
        let res     =   await requestApi(apiUrl);
        return res.data;
    },
    getExamples : async function(word){
        let apiUrl  = CONFIG.API_URL.BASE_URL + 'word/'+ word + CONFIG.API_URL.EXAMPLES + CONFIG.API_KEY;
        let res = await requestApi(apiUrl);
        return res.data; 
    }
}



module.exports = service;