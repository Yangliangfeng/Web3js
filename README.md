#添加Web3.js

  //用npm<br>
  npm install web3<br>
  
  //用yarn<br>
  yarn add web3
  
  //用bower<br>
  bower install web3<br>
  
  甚至，你可以从 github 直接下载压缩后的 .js 文件 然后包含到你的项目文件中：<script language="javascript" type="text/javascript" src="web3.min.js"></script>

#Web3 Provider

要记住，以太坊是由共享同一份数据的相同拷贝的 节点 构成的。 在 Web3.js 里设置 Web3 的 Provider 告诉我们的代码应该和 哪个节点 交互来处理我们的读写。这就好像在传统的 Web 应用程序中为你的 API 调用设置远程 Web 服务器的网址。

##Infura

Infura 是一个服务，它维护了很多以太坊节点并提供了一个缓存层来实现高速读取。你可以用他们的 API 来免费访问这个服务。 用 Infura 作为节点提供者，你可以不用自己运营节点就能很可靠地向以太坊发送、接收信息。

var web3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws"));

##Metamask

Metamask 是 Chrome 和 Firefox 的浏览器扩展， 它能让用户安全地维护他们的以太坊账户和私钥， 并用他们的账户和网站互动来使用 Web3.js。

##使用 Metamask 的 web3 提供者

Metamask 把它的 web3 提供者注入到浏览器的全局 JavaScript对象web3中。所以你的应用可以检查 web3 是否存在。若存在就使用 web3.currentProvider 作为它的提供者。

window.addEventListener('load', function() {

  // 检查web3是否已经注入到(Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
  
    // 使用 Mist/MetaMask 的提供者
    web3js = new Web3(web3.currentProvider);
  } else {
  
    // 处理用户没安装的情况， 比如显示一个消息
    // 告诉他们要安装 MetaMask 来使用我们的应用
  }

  // 现在你可以启动你的应用并自由访问 Web3.js:
  startApp()

})


