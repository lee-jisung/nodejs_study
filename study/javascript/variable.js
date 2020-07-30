let int_data = 1;
let float_data1 = Number('1.0');
let float_data2 = new Number('4.12345');

typeof int_data;
typeof float_data1;
typeof float_data2;

// 진수별로 출력
console.log((255).toString(10));
console.log((255).toString(16));
console.log((255).toString(8));
console.log((255).toString(2));

var character1 = 'a';
var character2 = 'b';
var string1 = 'Double Quotations';
var string2 = 'Single Quotation Anyway';
var string3 = new String('String Object');

typeof string1;
// "string"

typeof string3;
// "object"

string2[4];
// "l"

console.log(string2.charAt(4));
// "l"
console.log(string3[1]);
//"t"

console.log(string1.length);
// 17

console.log(string1.toUpperCase());
// "DOUBLE QUOTATIONS"

console.log(string2.toLowerCase());
// "single quotation anyway"

console.log(string3.indexOf('g'));
// 5
console.log(string3.indexOf('x'));
// -1
