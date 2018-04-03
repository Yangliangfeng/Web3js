# 1. 搭建方法
## 1.1. 下载程序 

[官方地址](https://geth.ethereum.org/downloads/)

1.8.2 linux 64位： 
```
wget 115.238.241.140/eth.1.8.2.bin.tgz 
```

## 1.2. 设置创世块参数(genesis.json):
需要设置私链ID，可以预分配余额
```
{
    "config": {
        "chainId": 95788961,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
    "difficulty": "2000000",
    "gasLimit": "21000",
    "alloc": {
        "4a48a957cfb52cee9602a65ad4facead6f49de19": { "balance": "500000" },
        "c0520c9a98a548d8c6974a2b4fb4a2591be40d2b": { "balance": "500000" }
    }
}
```
## 1.3. 初始化
```
geth --datadir /data/myeth init genesis.json
```
## 1.4. 启动bootnode
```
bootnode --genkey=boot.key
bootnode --nodekey=/data/myeth/boot.key
```
## 1.5. 启动eth节点
```
geth  --datadir /data/myeth --networkid 95788961 --bootnodes enode://198abd7719a3e26f848fa937f8479bde9b0d1fd26197d0c81481955f7e19d358e38eb28fb5d0004011f6ad323ad897d3ca577f21c5a6d34c15269105ac7b2e90@122.226.182.199:30301
```



# 2. console
## 2.1. 进入控制后台
```
geth  --datadir /data/myeth --networkid 95788961 attach
```
常用命令
```
#查看状态
web3.fromWei(eth.getBalance(eth.accounts[0]),'ether')
eth.blockNumber

# 挖矿
miner.start(1)
miner.stop()
miner.getHashrate()


#节点网络
admin.nodeInfo.enode
admin.addPeer("enode://.@:")
admin.peers

#交易
personal.unlockAccount(eth.accounts[0])
eth.sendTransaction({from:eth.accounts[0],to:"",value:web3.toWei(1,"ether"), gas: eth.getBlock("latest").gasLimit})
txpool.status
eth.getTransaction("")
eth.getTransactionReceipt("")
```

# 3. 合约
## 3.1. 编译
```
echo "var tokenOutput=`solc --optimize --combined-json abi,bin,interface Token.sol`" > Token.js
```



## 3.2. 发布合约
```
loadScript("Token.js")
var testContract = web3.eth.contract(JSON.parse(tokenOutput.contracts["Token.sol:Token"].abi));
var contract = testContract.new({ from: eth.accounts[0], data: "0x" + tokenOutput.contracts["Token.sol:Token"].bin, gas: eth.getBlock("latest").gasLimit},
  function (e, contract) {
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
  }
);


```

## 3.3. 查看、交易代币
```
loadScript("Token.js")
var abi = JSON.parse(tokenOutput.contracts["Token.sol:Token"].abi);
var contract = eth.contract(abi).at("");
contract.getBalance(eth.accounts[0]);
contract.transfer("dest addr", 30, {from: eth.accounts[0]})
```

# 4. web3 api 例子
## 依赖模块
```
npm install ethereumjs-tx
npm install web3@1.0.0-beta.18
# web3 >= 1.0
# geth >= 1.8.2
```

## 4.1. 创建
[例子](/web3/deploy.js)
## 4.2. 交易
[例子](/web3/send.js)

