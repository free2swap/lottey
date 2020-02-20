let solc=require('solc');

let fs=require('fs');

let data=fs.readFileSync('./contracts/Lottery.sol','utf-8');

let output=solc.compile(data,1);
//console.log(output['contracts'][':Lottery']);

module.exports=output['contracts'][':Lottery'];

