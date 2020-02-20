意义：
        在上一节知识学习中，我们已经了解如何实现一个基础区块链，并重构了BTC关键代码。对比传统的中心化项目，区块链项目拥有很多优势，如：追溯性、不可传篡改性。在中心化项目中的网络协议是：【数据层-----网络层--------传输层-------应用层】而在区块链中的网络协议为：【数据层------网络层--------共识层（pow、poc、dpos等）--------激励层（各种币）-------应用层】。这些优势和特定让区块链成为了有特点的超级账本。

       在区块链1.0时代中，Btc开启了数字货币时代，但实质上pow的算题既浪费了大量电力却又没有实际上的意义。这时候而ETH横空而出，让区块链的应用层有了更好的前景和意义。以太坊是一个开源的有智能合约功能的公共区块链平台，是区块链应用层的一个典型币种。作为区块链的第二大货币，我们有必要详细研究一番。

---------------------------------------------------------------------------------------------------------------------------------------

如果您改进了代码或者想对照代码学习，请访问我的Github。

如果您有问题想要讨论。请加我微信:laughing_jk(加我，请备注来源，谢谢)

彩票项目源码：https://github.com/lsy-zhaoshuaiji/lottey.git

---------------------------------------------------------------------------------------------------------------------------------------

一、准备工作
一、以太坊IDE：

由于以太坊目前没有专门的IDE只能在Chrome和火狐上编译，所以为了防止文件丢失，我们需要安装remix-ide，让文件关联到本地。点击网址，即可进行solidity合约编写。

http://remix.ethereum.org/

npm install remix-ide -g
remix-ide
或者

git clone https://github.com/ethereum/remix-ide.git
git clone https://github.com/ethereum/remix.git # only if you plan to link remix and remix-ide repositories and develop on it.

cd remix  # only if you plan to link remix and remix-ide repositories and develop on it.
npm install  # only if you plan to link remix and remix-ide repositories and develop on it.
npm run bootstrap  # only if you plan to link remix and remix-ide repositories and develop on it.

cd remix-ide
npm install
npm run setupremix  # only if you plan to link remix and remix-ide repositories and develop on it.
npm start

二、安装metamask：

Metamask是与以太坊交互的重要工具，使用请务必安装

https://github.com/MetaMask/metamask-extension/releases

三、安装geth：

https://ethfans.org/wikis/Ethereum-Geth-Mirror

点击下载下来的exe安装文件，选择安装目录，安装后会自动生成geth和keystore文件夹，在keystore会保存账户密码，也就是你的钱包的重点，为了防止丢失可以多复制几份，存在不同的地方。打开cmd输入geth --help  若有反应则代表成功

四、.安装以太坊钱包（可略）

下载网址如下，需要科学上网

https://ethfans.org/wikis/Ethereum-Wallet-Mirror

二、学习SOLIDITY
Solidity是面向对象的语言，是以太坊智能合约开发的必备知识之一，所以我们需要学习一下solidity。特别注意在remix中是不支持直接进行中文注释的，所以您需要在其他地方注释后 复制过来才能正常使用。

一、solidity基础

pragma solidity ^0.4.24;                       //版本号

contract Test{
    uint256 ui=100;
    int256  i =50;
    function add()returns(uint256){            //没有main函数调用则执行
        return ui + uint256(i);
    }
    
}
1.private view为私有函数，只能在合约内调用，public view为公有函数，任何用户都能调用，函数默认为public view

2.view/constant/pure：，如果函数中只读引用了状态变量，那么函数应该修饰为view/constant，若未引用状态变量则修饰为pure，如果修改了状态变量则都不用。

3.如果调用需要转钱，则需要将函数标注为payable

4.获取当前合约余额，return this.balance   this指代当前合约

5.wei与ETH的转换率为10**18 （10的18次方，wei为最小单位，1个ETH=1*10**8）

6.send 返回ture或者flase ，transfer返回异常，即使没有判断send的返回值，合约也会返回成功。所以属于transfer更安全，

7.转账转的是合约的钱，所以谁调用transfer谁就受益。

pragma solidity ^0.4.24;

contract Test {
    address add0=0x00ca35b7d915458ef540ade6068dfe2f44e8fa733c;
    address add1=0x0014723a09acff6d2a60dcdf7aa4aff308fddc160c;
    function ()public payable{
        
    }
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
    function Transfer() public{
        add1.transfer(10* 10**18);
    }
    function getAdd2Balance()public view returns(uint256){
        return add1.balance;
    }
}

8.动态bytes 可以不分配空间，直接用字符串进行赋值（新版本IDE不可以）

9.动态bytes，若未分配空间，直接通过下标获取则会报错

10.动态bytes可以通过bytes.lenth进行下标赋值，自动分配空间，默认值为0

11.动态bytes可以通过下标进行修改

12.动态bytes支持push操作，类似于append，可以追加元素

13.定长bytes不能修改数据、不能修改长度，可以通过下标访问。定义方法例如： bytes5 publikc test 

14.string是不支持lenth和push等操作的，但是可以借助bytes实现，如byte(str)s.lenth

15.参数变量默认为memory，状态变量默认是storage，函数内局部变量默认也为storage，但可以修改为memory。

16.如果变量想在函数间进行引用传递，需要定义参数变量类型为storage，  如: setTest(string storage str1)

17.结构体定义如下：

pragma solidity ^0.4.24;

contract Test{
    struct student{
        string Name;
        uint8  Age;
        string Sex;
    }
    student[] public Students;
    student public stu1=student("laughing",18,"b");
    student public stu2=student("fancen",19,"g");
    student public stu3=student({Name:"jim",Age:30,Sex:"g"});
    function SetStruct() public {
        Students.push(stu1);
        Students.push(stu2);
        Students.push(stu3);
        stu1.Name="Lif";
        
    }
    function ShowData()public view returns(string,uint8,string){
        return (stu2.Name,stu2.Age,stu2.Sex);
    }
}

18.mapping定义如下：

pragma solidity ^0.4.24;

contract Test{
    mapping(uint64 => string) public id_nums;
    constructor() public{
        id_nums[1]="hello";
        id_nums[2]="world";
    }
    function ShowData(uint64 id)public view returns(string){
        string storage tmp=id_nums[id];
        return tmp;
    }
}



//若mapping值不存在，则返回对应类型的空值
19.msg.sender是一个可变的值，谁调用msg.sender，msg.sender就是谁

20.在部署合约的时候，设置一个全局唯一的所有者，后面可以使用权限控制

21.msg.value可以获取合约的钱，函数使用了msg.value 就一定要把此函数修饰为payable

20.全局变量，如下：

pragma solidity ^0.4.24;


contract Test {
    
    bytes32 public blockhash1;
    address public coinbase;
    uint public difficulty;
    uint public gaslimit;
    uint public blockNum;
    uint public timestamp;
    bytes public calldata;
    uint public gas;
    address public sender;
    bytes4 public sig;
    uint public msgValue;
    uint public now1;
    uint public gasPrice;
    address public txOrigin;
    
    function tt () public payable {
        
        blockNum = block.number;// (uint)当前区块的块号。
        //给定区块号的哈希值，只支持最近256个区块，且不包含当前区块
        blockhash1 = blockhash(block.number - 1);
        coinbase = block.coinbase ;//当前块矿工的地址。
        difficulty = block.difficulty;//当前块的难度。
        gaslimit = block.gaslimit;// (uint)当前块的gaslimit。

        timestamp = block.timestamp;// (uint)当前块的时间戳。
        calldata = msg.data;// (bytes)完整的调用数据（calldata）。
        gas = gasleft();// (uint)当前还剩的gas。
        sender = msg.sender; // (address)当前调用发起人的地址。
        sig = msg.sig;// (bytes4)调用数据的前四个字节（函数标识符）。
        msgValue = msg.value;// (uint)这个消息所附带的货币量，单位为wei。
        now1 = now;// (uint)当前块的时间戳，等同于block.timestamp
        gasPrice = tx.gasprice;// (uint) 交易的gas价格。
        txOrigin = tx.origin;// (address)交易的发送者（完整的调用链）  
    }
}

22.require(A==B)和assert(a==b)的判断是真，才会执行，而revert是直接退出，需要在revert前提前判断好；

23.modify中的_;代表要修饰的真实代码，用法：只需在要修饰的函数名称public前加上modify名称即可

24.创建方法合约地址如下：

pragma solidity ^0.4.24;


contract T1{
    string public data;
    constructor(string input)public{
        data=input;
    }
    
}
contract T2{
    T1 public t1;
    function getValue()public returns(string){
        address add1=new T1("hello");
        t1=T1(add1);
        return t1.data();
    }
    
}


contract T3{
    T1 public t3=new T1("world");
    function getValue2()public view returns(string){
        return t3.data();
    }
}


contract T4{
    T1 public t4;
    function getValue3(address input) public returns(string){
        t4=T1(input);
        return t4.data();
    }
}

25.合约之间转账，使用T1.info.value.gas(500);

pragma solidity ^0.4.24;


contract T1{
    function info() payable public{
        
    }
    function getT1Value()public view returns(uint256){
        return address(this).balance;
    }
}

contract T2{
    T1 public t1;
    function getT2Value()public view returns(uint256){
        return address(this).balance;
    }
    function setContract(address add) public{
        t1=T1(add);
    }
    function callFeed()public{
        t1.info.value(5).gas(800)();
    }
    function() payable public{
        
    }
}
26.加密函数由sha3变为keccak256

pragma solidity ^0.4.24;


contract T1{
    function tes() public pure returns (bytes32){
        bytes memory dataBytes=abi.encodePacked("hello",uint256(1),"world");
        bytes32 hash=keccak256(dataBytes);
        return hash;
    }
}
27.solidity使用is进行继承，若出现多个继承，继承原则为，最远继承。

二、基于solidity进行eth发币：

pragma solidity ^0.4.24;

/**
 * Math operations with safety checks
 */
contract SafeMath {
  //internal > private 
    //internal < public
    //修饰的函数只能在合约的内部或者子合约中使用
    //乘法
  function safeMul(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a * b;
    //assert断言函数，需要保证函数参数返回值是true，否则抛异常
    assert(a == 0 || c / a == b);
    return c;
  }
//除法
  function safeDiv(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b > 0);
    uint256 c = a / b;
    //   a = 11
    //   b = 10
    //   c = 1
      
      //b*c = 10
      //a %b = 1
      //11
    assert(a == b * c + a % b);
    return c;
  }

    //减法
  function safeSub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    assert(b >=0);
    return a - b;
  }

  function safeAdd(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    assert(c>=a && c>=b);
    return c;
  }
}


contract HangTouCoin is SafeMath{
    
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    
	address public owner;

    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;
    
    
    //key:授权人                key:被授权人  value: 配额
    mapping (address => mapping (address => uint256)) public allowance;
    
    mapping (address => uint256) public freezeOf;

    /* This generates a public event on the blockchain that will notify clients */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /* This notifies clients about the amount burnt */
    event Burn(address indexed from, uint256 value);
	
	/* This notifies clients about the amount frozen */
    event Freeze(address indexed from, uint256 value);
	
	/* This notifies clients about the amount unfrozen */
    event Unfreeze(address indexed from, uint256 value);

    /* Initializes contract with initial supply tokens to the creator of the contract */
    
    //1000000, "HangTouCoin", "HTC"
     constructor(
        uint256 _initialSupply, //发行数量 
        string _tokenName, //token的名字 HTCoin
        //uint8 _decimalUnits, //最小分割，小数点后面的尾数 1ether = 10** 18wei
        string _tokenSymbol //HTC
        ) public {
            
        decimals = 18;//_decimalUnits;                           // Amount of decimals for display purposes
        balanceOf[msg.sender] = _initialSupply * 10 ** 18;              // Give the creator all initial tokens
        totalSupply = _initialSupply * 10 ** 18;                        // Update total supply
        name = _tokenName;                                   // Set the name for display purposes
        symbol = _tokenSymbol;                               // Set the symbol for display purposes
     
		owner = msg.sender;
    }

    /* Send coins */
    //某个人花费自己的币
    function transfer(address _to, uint256 _value) {
        if (_to == 0x0) throw;                               // Prevent transfer to 0x0 address. Use burn() instead
		if (_value <= 0) throw; 
        if (balanceOf[msg.sender] < _value) throw;           // Check if the sender has enough
        if (balanceOf[_to] + _value < balanceOf[_to]) throw; // Check for overflows
        
        balanceOf[msg.sender] = SafeMath.safeSub(balanceOf[msg.sender], _value);                     // Subtract from the sender
        balanceOf[_to] = SafeMath.safeAdd(balanceOf[_to], _value);                            // Add the same to the recipient
        emit Transfer(msg.sender, _to, _value);                   // Notify anyone listening that this transfer took place
    }

    /* Allow another contract to spend some tokens in your behalf */
    //找一个人A帮你花费token，这部分钱并不打A的账户，只是对A进行花费的授权
    //A： 1万
    function approve(address _spender, uint256 _value)
        returns (bool success) {
		if (_value <= 0) throw; 
        //allowance[管理员][A] = 1万
        allowance[msg.sender][_spender] = _value;
        return true;
    }
       

    /* A contract attempts to get the coins */
    function transferFrom(address _from /*管理员*/, address _to, uint256 _value) returns (bool success) {
        if (_to == 0x0) throw;                                // Prevent transfer to 0x0 address. Use burn() instead
		if (_value <= 0) throw; 
        if (balanceOf[_from] < _value) throw;                 // Check if the sender has enough
        
        if (balanceOf[_to] + _value < balanceOf[_to]) throw;  // Check for overflows
        
        if (_value > allowance[_from][msg.sender]) throw;     // Check allowance
           // mapping (address => mapping (address => uint256)) public allowance;
           
           
        balanceOf[_from] = SafeMath.safeSub(balanceOf[_from], _value);                           // Subtract from the sender
        
        balanceOf[_to] = SafeMath.safeAdd(balanceOf[_to], _value);                             // Add the same to the recipient
       
        //allowance[管理员][A] = 1万-五千 = 五千
        allowance[_from][msg.sender] = SafeMath.safeSub(allowance[_from][msg.sender], _value);
        emit Transfer(_from, _to, _value);
        return true;
    }

    function burn(uint256 _value) returns (bool success) {
        if (balanceOf[msg.sender] < _value) throw;            // Check if the sender has enough
		if (_value <= 0) throw; 
        balanceOf[msg.sender] = SafeMath.safeSub(balanceOf[msg.sender], _value);                      // Subtract from the sender
        totalSupply = SafeMath.safeSub(totalSupply,_value);                                // Updates totalSupply
        emit Burn(msg.sender, _value);
        return true;
    }
	
	function freeze(uint256 _value) returns (bool success) {
        if (balanceOf[msg.sender] < _value) throw;            // Check if the sender has enough
		if (_value <= 0) throw; 
        balanceOf[msg.sender] = SafeMath.safeSub(balanceOf[msg.sender], _value);                      // Subtract from the sender
        freezeOf[msg.sender] = SafeMath.safeAdd(freezeOf[msg.sender], _value);                                // Updates totalSupply
        Freeze(msg.sender, _value);
        return true;
    }
	
	function unfreeze(uint256 _value) returns (bool success) {
        if (freezeOf[msg.sender] < _value) throw;            // Check if the sender has enough
		if (_value <= 0) throw; 
        freezeOf[msg.sender] = SafeMath.safeSub(freezeOf[msg.sender], _value);                      // Subtract from the sender
		balanceOf[msg.sender] = SafeMath.safeAdd(balanceOf[msg.sender], _value);
        Unfreeze(msg.sender, _value);
        return true;
    }
	
	// transfer balance to owner
	function withdrawEther(uint256 amount) {
		if(msg.sender != owner)throw;
		owner.transfer(amount);
	}
	
	// can accept ether
	function() payable {
    }
}
三、node.js学习
