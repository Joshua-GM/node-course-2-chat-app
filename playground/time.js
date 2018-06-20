const moment = require('moment');


//date.add(100, 'year').subtract(9, 'm');
let someTimestamp = moment().valueOf();
console.log(someTimestamp);

let date = moment(someTimestamp);
//console.log(date);

console.log(date.format('h:mm a'));
