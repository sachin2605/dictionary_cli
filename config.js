var CONFIG = {
    API_KEY           : '2664974834b29fbd8ba7b3cc40c23f5e065abb92098d05352bc1632493b8e73681cee78494c62817fe70c9d01a70f18a660d4dda78cc8ce6d55393151ffc1a346952ba303c74cd10f05a0efa0979ebed',
    API_URL           : {
      BASE_URL              : 'https://fourtytwowords.herokuapp.com/',
      RELATED               : '/relatedWords?api_key=',
      DEFINITIONS           : '/definitions?api_key=',
      EXAMPLES              : '/examples?api_key=',
      RANDOM_WORD           : 'words/randomWord?api_key='
    },
    COMMANDS          : {
        DEFINITIONS  : 'def',
        SYNONYMS     : 'syn',
        ANTONYMS     : 'ant',
        EXAMPLES     : 'ex',
        DICTIONARY   : 'dict',
        HELP         : '--help',
        PLAY         : 'play'
    }, 
    MESSAGES : {
        NO_DATA      : 'No Data',
        HELP         : 'Available commands:\n\nFor definition:      ./dict def <word>'
        + '\nFor synonyms:        ./dict syn <word>\nFor antonyms:        ./dic ant <word>'
        + '\nFor examples:        ./dict ex <word>\nFor full dictionary: ./dict <word> or ./dict dict <word>'
        + '\nFor word of the day dictionary:  ./dict\nFor word game:       ./dict play',
    }
};

module.exports = CONFIG;
