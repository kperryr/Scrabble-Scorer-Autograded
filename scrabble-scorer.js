// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   let userWord = input.question("Enter a word to score:");
   while(!(/^[a-zA-Z]+$/.test(userWord))){
      userWord = input.question("Error: Invalid characters. Please enter a word to score:");
   }
   return userWord;
}

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word){
   return word.length;
};

let vowelBonusScorer = function(word){
   let vowels = ['A', 'E', 'I', 'O', 'U'];
   let score = 0;
   for (let i in word){
      if (vowels.includes(word[i].toUpperCase())){
         score += 3;
      }else{
         score += 1;
      }
   }
   return score;
};

let scrabbleScorer = function(word){
   let score = 0;
   for (let i in word){
      score += newPointStructure[word[i]];
   }
   return score;
};

const scoringAlgorithms = [
   {"name":"Simple Score",
    "description":"Each letter is worth 1 point.",
    "scroerFunction":simpleScorer}, 

   {"name":"Bonus Vowels",
    "description":"Vowels are 3 pts, consonants are 1 pt.",
    "scroerFunction":vowelBonusScorer},

   {"name":"Scrabble",
    "description":"The traditional scoring algorithm.",
    "scroerFunction":scrabbleScorer}
];

function scorerPrompt(userWord) {
   let numArr = [0,1,2];
   console.log("Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system");

   let algoNum = input.question("Enter 0, 1, or 2:");
   algoNum = Number(algoNum);
   while (!(numArr.includes(algoNum))){
      algoNum = input.question("Error: Invalid Number. Enter 0, 1, or 2:");
      algoNum = Number(algoNum);
   }

   console.log(`Score for '${userWord}': ${scoringAlgorithms[algoNum].scroerFunction(userWord)}`);
   
   return scoringAlgorithms[algoNum];
}

function transform(obj) {
   let newObj = {};
   let arr = [];
   for (let key in obj){
      arr = obj[key];
      
      for(let i in arr){
         let lowerCaseKey = arr[i].toLowerCase();
         newObj[lowerCaseKey] = Number(key);
      }
   }
   return newObj;
};

function runProgram() {
   let word_to_score = initialPrompt();
   scorerPrompt(word_to_score);
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
