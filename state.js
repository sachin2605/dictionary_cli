const Spinner = require('cli-spinner').Spinner;
let spinner = new Spinner('searching.. %s');
spinner.setSpinnerString('|/-\\');
let state = {
    GAME_MODE                 : false,
    cache : {},
    SPINNER                   : spinner
}
module.exports = state;