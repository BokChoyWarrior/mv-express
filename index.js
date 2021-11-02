function sortedWord(str) {
  return str.split("").sort().join("");
}

function sortAnagrams(inputArr) {
  const dict = {};
  for (str1 of inputArr) {
    // if we haven't seen this anagram before, create entry
    // else, append string to it's anagram list
    if (!dict[sortedWord(str1)]) {
      dict[sortedWord(str1)] = [str1];
    } else {
      dict[sortedWord(str1)].push(str1);
    }
  }

  return Object.values(dict);
}

const input = [
  "altered",
  "education",
  "scar",
  "auctioned",
  "related",
  "cars",
  "arcs",
  "lean",
];

console.log(sortAnagrams(input));
