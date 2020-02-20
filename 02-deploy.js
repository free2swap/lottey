let {bytecode,interface}=require('./01-compile');

let Web3=require('web3');
let web3=new Web3();
// let Hdwallet=require('truffle-hdwallet-provider');
// let memoryWords='';
// let agentIP='';
// let provider=new Hdwallet(memoryWords,agentIP);
web3.setProvider('http://127.0.0.1:7545');
let contract=new web3.eth.Contract(JSON.parse(interface));
const account='0xa3E8DB71C969DeC7020609233Cae940957D3b750';
let Run=async()=>{
    try {
        let accounts = await web3.eth.getAccounts()
        console.log('accounts :', accounts)
        let instance = await contract.deploy({
            data: bytecode,
        }).send({
            from: accounts[0],
            gas: '800000',
        });
        console.log('contract address：', instance.options.address);
    } catch (e) {
        console.log("eeeeeeeeeeeeeeeeeeee",e)
    }
};

Run();



