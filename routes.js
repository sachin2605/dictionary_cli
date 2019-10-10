const COMMON_CONTROLLER = require('./controllers/commonControllers');
const CONFIG = require('./config');

async function Routes(data,state){
    if(!data) return;

    state.SPINNER.start();
    data = data.split(' ');
    this._app       = (data[0]?data[0]: null);
    this._command   = (data[1]?data[1]: null);
    this._word      = (data[2]?data[2]: null);

    if(!state.GAME_MODE){
        switch(this._command){
            case CONFIG.COMMANDS.DEFINITIONS:
                await COMMON_CONTROLLER.displayDefinition(this._word, state);
                break;
            case CONFIG.COMMANDS.SYNONYMS:
                await COMMON_CONTROLLER.displaySynonym(this._word, state);
                break;
            case CONFIG.COMMANDS.ANTONYMS:
                await COMMON_CONTROLLER.displayAntonym(this._word, state);
                break;
            case CONFIG.COMMANDS.EXAMPLES:
                await COMMON_CONTROLLER.displayExample(this._word, state);
                break;
            case CONFIG.COMMANDS.DICTIONARY:
                await COMMON_CONTROLLER.displayFullDictionary(this._word, state);
                break;
            case CONFIG.COMMANDS.PLAY:
                COMMON_CONTROLLER.playGame(state);
                break;
            case CONFIG.COMMANDS.HELP:
                COMMON_CONTROLLER.displayHelp();
                break;
            default:
                await COMMON_CONTROLLER.defaultAction(this._command, state);
          }

    }else{
        //routes for game mode.
    }
    state.SPINNER.stop();
}

module.exports = Routes;