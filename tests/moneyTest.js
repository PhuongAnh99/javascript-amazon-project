import {formatCurrency} from '../scripts/utils/money.js';

if(formatCurrency(2000.5) === '20.01'){
    console.log("Test passed!");
}
else{
    console.log("Test failed!");
    console.log(formatCurrency(2000.5));
}