const chalk = require('chalk');
const CONFIG = require('./../config');
function WORD(word, res){
    this._word = word;
    this._definitions   =   res['definitions']? res['definitions']:[];
    this._antonyms      =   res['antonyms']? res['antonyms']:[];
    this._synonyms      =   res['synonyms']? res['synonyms']:[];
    this._examples      =   res['examples']? res['examples']:[];
};

WORD.prototype.add = function(type,res){
    this['_'+type] = (res[type]) ? res[type]:[];
}

WORD.prototype.show = function(type){
    console.log(chalk.bold.underline.italic.redBright(this._word)+ '\n');
    if(CONFIG.COMMANDS.DEFINITIONS == type)
        print('DEFINITIONS',this._definitions);
    else if(CONFIG.COMMANDS.SYNONYMS == type)
        print('SYNONYMS',this._synonyms);
    else if(CONFIG.COMMANDS.ANTONYMS == type)
        print('ANTONYMS',this._antonyms);
    else if(CONFIG.COMMANDS.EXAMPLES == type)
        print('EXAMPLES',this._examples);
    else{
        print('DEFINITIONS',this._definitions);
        print('SYNONYMS',this._synonyms);
        print('ANTONYMS',this._antonyms);
        print('EXAMPLES',this._examples);
    }
}
function print(title,arr){
    console.log(chalk.red('------------------------------------------------------------------'));
    console.log(chalk.green.underline.bold(title) + '\n');
    if(arr.length == 0){
        console.log(chalk.red('NO DATA'));
        return;
    }
    arr.forEach((el,i) => {
        console.log(chalk.blue('-'+el + '\n'));
    });
}

module.exports = WORD;