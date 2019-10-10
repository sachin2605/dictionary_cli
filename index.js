
const READLINE = require('readline');
const ROUTES = require('./routes');
var STATE = require('./state');
const chalk = require('chalk');


let inp = READLINE.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '42WORDS>> '
});

console.log('type ./dict --help for all commands');

inp.on('line',async function (line) {
    try{
        await ROUTES(line.trim(),STATE);
    }catch(err){
    }
    inp.prompt();
});

inp.on('SIGINT', () => {
    
    inp.question('Leaving Dict? ', (ans) => {
      if (ans.match(/^y(es)?$/i)) inp.pause();
    });
    inp.pause();
});

