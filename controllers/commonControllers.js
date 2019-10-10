const WORD_SERVICE = require('./../service');
const WORD_DETAILS = require('./../models/word_details');
const CONFIG = require('./../config');
const chalk = require('chalk');
const state2 = require('./../state');

const CONTROLLER = {

    displayDefinition : async function(word, state){
        if(state.cache[word] && state.cache[word]._definitions ){
            state.cache[word].show(CONFIG.COMMANDS.DEFINITIONS);
        }else{
        let data = await WORD_SERVICE.getDefinition(word);
            if(data){
                let cleanData = _cleanDefData(data);
                state.cache[word] = new WORD_DETAILS(word,cleanData);
                state.cache[word].show(CONFIG.COMMANDS.DEFINITIONS);
            }
        }

    },

    displaySynonym : async function(word, state){

        if(state.cache[word] && state.cache[word]._synonyms.length>0 ){
            state.cache[word].show(CONFIG.COMMANDS.SYNONYMS);
        }else{
            let data = await WORD_SERVICE.getRelatedWords(word);
            if(data){
                let cleanData = _cleanRelatedData(data);
                state.cache[word] = new WORD_DETAILS(word,cleanData);
                state.cache[word].show(CONFIG.COMMANDS.SYNONYMS);
            }
        }

    },

    displayAntonym :   async function(word, state){

        if(state.cache[word] && state.cache[word]._antonyms.length>0 ){
            state.cache[word].show(CONFIG.COMMANDS.ANTONYMS);
        }else{
            let data = await WORD_SERVICE.getRelatedWords(word);
            if(data){
                let cleanData = _cleanRelatedData(data);
                state.cache[word] = new WORD_DETAILS(word,cleanData);
                state.cache[word].show(CONFIG.COMMANDS.ANTONYMS);
            }
        }

    },

    displayExample : async function(word, state){

        if(state.cache[word] && state.cache[word]._examples.length>0){
            state.cache[word].show(CONFIG.COMMANDS.EXAMPLES);
        }else{
            let data = await WORD_SERVICE.getExamples(word);
            if(data){
                let cleanData = _cleanExampleArray(data);
                state.cache[word] = new WORD_DETAILS(word,cleanData);
                state.cache[word].show(CONFIG.COMMANDS.EXAMPLES);
            }
        }

    },
    displayFullDictionary : async function(word, state){

        if( state.cache[word] && 
            state.cache[word]._examples.length>0 &&
            state.cache[word]._antonyms.length>0 &&
            state.cache[word]._synonyms.length>0     ){
                state.cache[word].show();
        }else{
            let word_detail = new WORD_DETAILS(word,{});

            await Promise.all(
                [
                    WORD_SERVICE.getDefinition(word),
                    WORD_SERVICE.getRelatedWords(word),
                    WORD_SERVICE.getExamples(word)
                ]
            ).then((result)=>{

                let def = _cleanDefData(result[0]),
                    syn_ant = _cleanRelatedData(result[1]),
                    ex = _cleanExampleArray(result[2]);

                    word_detail.add('definitions',def);
                    word_detail.add('synonyms',syn_ant);
                    word_detail.add('antonyms',syn_ant);
                    word_detail.add('examples',ex);

                    state.cache[word] = word_detail;
                    word_detail.show();
            
            })
            .catch(err=>{
                console.log(err);
            });
        }
        
    },

    displayWordOfTheDay : async function(state){
        let word = await WORD_SERVICE.getRandomWord();
        await CONTROLLER.displayFullDictionary(word,state);
    },

    defaultAction: async function(word, state){
        if(word){
          await CONTROLLER.displayFullDictionary(word, state);
        } else {
          await CONTROLLER.displayWordOfTheDay(state);
        }
    },

    displayHelp: function(){
        console.log(chalk.green(CONFIG.MESSAGES.HELP));
    },
    playGame : async function(){
        console.log(chalk.cyan('OOPS, Functionality PeNding. Please get back to the developer'));
    }

}

function _cleanDefData(defArr){
    let definitions  = [],
    data         = {};
    defArr.forEach(function(def){
        definitions.push(def.text);
    });
    data['definitions'] = definitions;
    return data;
}

function _cleanExampleArray(exArr){
    let examples  = [],
    data         = {};
    exArr.examples.forEach(function(def){
        examples.push(def.text);
    });
    data['examples'] = examples;
    return data;
}

function _cleanRelatedData(relArr){
    let antonyms  = [], synonyms = []
    data         = {};
    relArr.forEach(function(def){
        if(def.relationshipType =='antonym'){
            antonyms = def.words;
        }else{
            synonyms = def.words;
        }
    });
    data['antonyms'] = antonyms;
    data['synonyms'] = synonyms;
    return data;
}
module.exports = CONTROLLER;

// CONTROLLER.displayDefinition('nat',state2);