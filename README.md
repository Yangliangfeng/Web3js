1.添加Web3.js
---------------

  //用npm<br>
  npm install web3<br>
  
  //用yarn<br>
  yarn add web3
  
  //用bower<br>
  bower install web3<br>
  
  甚至，你可以从 github 直接下载压缩后的 .js 文件 然后包含到你的项目文件中：<script language="javascript" type="text/javascript" src="web3.min.js"></script>

2.Web3 Provider
--------------------
要记住，以太坊是由共享同一份数据的相同拷贝的 节点 构成的。 在 Web3.js 里设置 Web3 的 Provider 告诉我们的代码应该和 哪个节点 交互来处理我们的读写。这就好像在传统的 Web 应用程序中为你的 API 调用设置远程 Web 服务器的网址。

Infura
--------
Infura 是一个服务，它维护了很多以太坊节点并提供了一个缓存层来实现高速读取。你可以用他们的 API 来免费访问这个服务。 用 Infura 作为节点提供者，你可以不用自己运营节点就能很可靠地向以太坊发送、接收信息。

var web3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws"));

 Metamask
-------
Metamask 是 Chrome 和 Firefox 的浏览器扩展， 它能让用户安全地维护他们的以太坊账户和私钥， 并用他们的账户和网站互动来使用 Web3.js。

3.使用 Metamask 的 web3 提供者
-------------------------
Metamask 把它的 web3 提供者注入到浏览器的全局 JavaScript对象web3中。所以你的应用可以检查 web3 是否存在。若存在就使用 web3.currentProvider 作为它的提供者。

window.addEventListener('load', function() {<br>

      // 检查web3是否已经注入到(Mist/MetaMask)<br>
  
  if (typeof web3 !== 'undefined') {<br>
      // 使用 Mist/MetaMask 的提供者<br>
    web3js = new Web3(web3.currentProvider);<br>
  } else {<br>
      // 处理用户没安装的情况， 比如显示一个消息
      // 告诉他们要安装 MetaMask 来使用我们的应用<br>
  }<br>
    // 现在你可以启动你的应用并自由访问 Web3.js:<br>
  startApp()
})

#实例化 Web3.js

var myContract = new web3js.eth.Contract(myABI, myContractAddress);

  合约 ABI
------------
ABI 意为应用二进制接口（Application Binary Interface）。 基本上，它是以 JSON 格式表示合约的方法，告诉 Web3.js 如何以合同理解的方式格式化函数调用。

4.调用和合约函数
-----------------

  Call
-----------
  call 用来调用 view 和 pure 函数。它只运行在本地节点，不会在区块链上创建事务。
  myContract.methods.myMethod(123).call()
  
  Send
  --------------
  send 将创建一个事务并改变区块链上的数据。你需要用 send 来调用任何非 view 或者 pure 的函数
  myContract.methods.myMethod(123).send()
  
5.获得 MetaMask中的用户账户
---------------
  MetaMask 允许用户在扩展中管理多个账户
  我们可以通过这样来获取 web3 变量中激活的当前账户：<br>
  var userAccount = web3.eth.accounts[0]
  
  因为用户可以随时在 MetaMask 中切换账户，我们的应用需要监控这个变量
  我们可以通过 setInterval 方法来做:<br>
  
  var accountInterval = setInterval(function() {
  
  // 检查账户是否切换
  
  if (web3.eth.accounts[0] !== userAccount) {
  
    userAccount = web3.eth.accounts[0];
    
    // 调用一些方法来更新界面
    
    updateInterface();
    
  }
  
  }, 100);
  
6.发送事务
---------
  function createRandomZombie(name) {
  
  // 这将需要一段时间，所以在界面中告诉用户这一点
  // 事务被发送出去了
  
  $("#txStatus").text("正在区块链上创建僵尸，这将需要一会儿...");
  
  // 把事务发送到我们的合约:
  
  return CryptoZombies.methods.createRandomZombie(name)
  
  .send({ from: userAccount })
  
  .on("receipt", function(receipt) {
  
    $("#txStatus").text("成功生成了 " + name + "!");
    // 事务被区块链接受了，重新渲染界面
    
    getZombiesByOwner(userAccount).then(displayZombies);
  })
  
  .on("error", function(error) {
  
    // 告诉用户合约失败了
    $("#txStatus").text(error);
    
  });
  
 }
 我们的函数 send 一个事务到我们的 Web3 提供者，然后链式添加一些事件监听:
  receipt 将在合约被包含进以太坊区块上以后被触发，这意味着僵尸被创建并保存进我们的合约了。
  error 将在事务未被成功包含进区块后触发，比如用户未支付足够的 gas。我们需要在界面中通知用户事务失败以便他们可以再次尝试。



  







