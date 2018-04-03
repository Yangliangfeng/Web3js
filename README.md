#添加Web3.js

//用npm
npm install web3
//用yarn
yarn add web3
//用bower
bower install web3
甚至，你可以从 github 直接下载压缩后的 .js 文件 然后包含到你的项目文件中：
<script language="javascript" type="text/javascript" src="web3.min.js"></script>

#Web3 Provider

要记住，以太坊是由共享同一份数据的相同拷贝的 节点 构成的。 在 Web3.js 里设置 Web3 的 Provider 告诉我们的代码应该和 哪个节点 交互来处理我们的读写。这就好像在传统的 Web 应用程序中为你的 API 调用设置远程 Web 服务器的网址。

