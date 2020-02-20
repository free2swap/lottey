let Web3=require('web3');
let web3=new Web3();
let web3Provider;
if (window.ethereum) {
    web3Provider = window.ethereum;
    try {
        // 请求用户授权
        window.ethereum.enable().then()
    } catch (error) {
        // 用户不授权时
        console.error("User denied account access")
    }
} else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
    web3Provider = window.web3.currentProvider;
}
web3.setProvider(web3Provider);//web3js就是你需要的web3实例

web3.eth.getAccounts(function (error, result) {
    if (!error)
        console.log(result,"")//授权成功后result能正常获取到账号了
});
module.exports=web3;



