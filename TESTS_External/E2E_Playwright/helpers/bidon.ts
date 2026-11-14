import { extractIdFromURL } from "./helpers";

let a = extractIdFromURL("http://truc.com/id1");
console.log(a);
a = extractIdFromURL("http://truc.com/");
console.log(a);
