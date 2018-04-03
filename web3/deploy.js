#!/usr/bin/node

/*
npm install ethereumjs-tx
npm install web3@1.0.0-beta.18
geth > 1.8.2
*/

var conf = require('./conf.js')
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');

web3 = new Web3(new Web3.providers.HttpProvider("http://testbcapi.yiluzhuanqian.com"));

var contract_type = 'ERC20Test';
var my_account = '';
var my_pravite_key = '';

var contract_config = conf["contracts"][contract_type];
var abi = JSON.parse(contract_config["abi"]);
var bin = contract_config["bin"];
console.log(web3.version)

//console.log(abi)
//console.log(bin)


const test_deploy = async () => {
	var eth_balance = await web3.eth.getBalance(my_account);
	console.log('my eth balance: ' + eth_balance/Math.pow(10, 18));
	var contract = new web3.eth.Contract(abi);
	var count = await web3.eth.getTransactionCount(my_account);
	var data = contract.deploy({
		data: "0x"+bin,
		arguments: [10000, "TEMPC", "TEMPC"]
	}).encodeABI();
	console.log(data);
	var gasPrice = await web3.eth.getGasPrice();
	var block = await web3.eth.getBlock("latest");
	var gasLimit = block.gasLimit;
	console.log("gasPrice:"+gasPrice + ", gasLimit:"+gasLimit );
	var rawTransaction = {
		"from": my_account,
		"nonce": "0x" + count.toString(16),
		"gasPrice":  web3.utils.toHex(gasPrice),
		"gasLimit":  web3.utils.toHex(gasLimit),
		"data": data,
		"chainId": 95788961
	};
	console.log(rawTransaction);

	var privKey = new Buffer(my_pravite_key, 'hex');
	var tx = new Tx(rawTransaction);
	tx.sign(privKey);
	var serializedTx = tx.serialize();

	var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
	console.log('Receipt info:');
	console.log(receipt);
	console.log('transfer fee: ' + receipt['gasUsed'] * gasPrice / Math.pow(10, 18));

	// The balance may not be updated yet, but let's check
	
	eth_balance = await web3.eth.getBalance(my_account);
	console.log('my eth balance after send: ' + eth_balance/Math.pow(10, 18));

}
test_deploy();

