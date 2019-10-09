
const READLINE = require('readline');


let inp = READLINE.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'OHAI> '
});

console.log('CLI Started');

inp.on('line', (line) => {
    console.log(line);
    inp.prompt();
});

inp.on('SIGINT', () => {
    
    inp.question('Leaving Dict? ', (ans) => {
      if (ans.match(/^y(es)?$/i)) inp.pause();
    });
  
});

