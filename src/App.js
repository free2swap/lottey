import React,{Component} from 'react';
import CardExampleCard from './display/ui'

let web3=require('./utils/initWeb3');
let lotteryInstance=require('./eth/lottery');


class App extends Component{
    constructor(){
        super();
        this.state={
            manager: '',
            round: '',
            winner: '',
            playerCounts: 0,
            balance: 0,
            currentAccount: '',
            isClicked:false,
            isShowButton:'',
        }
    }
    async componentWillMount(){
        let accounts = await web3.eth.getAccounts();
        let manager = await lotteryInstance.methods.manager().call();
        let round= await  lotteryInstance.methods.roud().call();
        let winner= await  lotteryInstance.methods.winner().call();
        let ContractBalanceWei= await  lotteryInstance.methods.getBlance().call();
        let playerCounts= await  lotteryInstance.methods.playerCounts().call();
        let balance=web3.utils.fromWei(ContractBalanceWei,'ether');
        let isShowButton=manager===accounts[0]? 'inline':'none';

        this.setState({
            manager,
            currentAccount: accounts[0],
            round,
            // players:plays,
            winner,
            balance,
            playerCounts,
            isShowButton,
        })
    }
    play=async ()=>{
        this.setState({isClicked:true});
        console.log(this.state.isClicked);
        try {
            await lotteryInstance.methods.play().send({
                from: this.state.currentAccount,
                value: web3.utils.toWei('1', 'ether'),
                gas: '3000000',
            });
            this.setState({isClicked:false});
            alert('successfully');
            window.location.reload(true);
        } catch (e) {
            this.setState({isClicked:false});
            console.log(e)
        }
    };
    KaiJiang=async ()=>{
        try {
            let winner=this.state.winner;
            this.setState({isClicked:true});
            await lotteryInstance.methods.KaiJiang().send({
                from: this.state.currentAccount,
                // value: web3.utils.toWei('1', 'ether'),
                gas: '3000000',
            });
            this.setState({isClicked:false});
            alert(`开奖successfully中奖人为:${winner}`);
            window.location.reload(true);
        } catch (e) {
            this.setState({isClicked:false});
            console.log(e)
        }
    };
    TuiJiang=async ()=>{
        try {
            this.setState({isClicked:true});
            await lotteryInstance.methods.TuiJiang().send({
                from: this.state.currentAccount,
                // value: web3.utils.toWei('1', 'ether'),
                gas: '3000000',
            });
            alert('退奖successfully');
            this.setState({isClicked:false});
            window.location.reload(true);
        } catch (e) {
            this.setState({isClicked:false});
            console.log(e)
        }
    };



    render(){
    return(
        <div>
            <CardExampleCard
                 manager={this.state.manager}
                 round={this.state.round}
                 winner={this.state.winner}
                 balance={this.state.balance}
                 playersCounts={this.state.playerCounts}
                 currentAccount={this.state.currentAccount}
                 play={this.play}
                 KaiJiang={this.KaiJiang}
                 TuiJiang={this.TuiJiang}
                 isClicked={this.state.isClicked}
                 isShowButton={this.state.isShowButton}
            />
        </div>

    );
  }
}
export default App;
