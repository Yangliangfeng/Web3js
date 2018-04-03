#!/usr/bin/node

/*
npm install ethereumjs-tx
npm install web3@1.0.0-beta.18
TIMEOUTBLOCK
geth > 1.8.2
*/

var conf = require('./conf.js')
var Web3 = require('web3');
var Tx = require('ethereumjs-tx');

web3 = new Web3(new Web3.providers.HttpProvider("http://testbcapi.yiluzhuanqian.com"));

var contract_type = 'ERC20Test';
var my_account = '';
var my_pravite_key = '';
var dest_account = '';

var contract_config = conf["contracts"][contract_type];
var abi = JSON.parse(contract_config["abi"]);
var bin = contract_config["bin"];
var token = contract_config["tokens"][0];
console.log(token["symbol"]+" addr: "+token['address']);
console.log(web3.version)

//console.log(abi)
//console.log(bin)

/*
try{
	web3.personal.unlockAccount(my_account, '', 30);
	var txid = eos.transfer( dest_account, 10*Math.pow(10, eos.decimals()), {from:  my_account});
	console.log(txid);
} catch (err) {
	console.log(err);
}
*/

const test_transfer = async () => {
	var eos = new web3.eth.Contract(abi, token['address'], { from: my_account});
	var decimals = await eos.methods.decimals().call();
	var balance = await eos.methods.balanceOf(my_account).call();
	var eth_balance = await web3.eth.getBalance(my_account);
	var send_eos = 10;
	var send_eth = 10;
	console.log('my eos balance:' + balance/Math.pow(10,decimals));
	console.log('my eth balance:' + eth_balance/Math.pow(10, 18));


	var count = await web3.eth.getTransactionCount(my_account);
	var gasPrice = await web3.eth.getGasPrice();
	var estimateGas = await web3.eth.estimateGas({ to: dest_account, data: data});
	var block = await web3.eth.getBlock("latest");
	var gasLimit = block.gasLimit;
	console.log("gasPrice:"+gasPrice + ", gasLimit:"+gasLimit + ", estimateGas:"+estimateGas );
	var data = eos.methods.transfer( dest_account, web3.utils.toHex(send_eos*Math.pow(10, decimals))).encodeABI();
	var rawTransaction = {
		"from": my_account,
		"nonce": "0x" + count.toString(16),
		"gasPrice":  web3.utils.toHex(gasPrice),
		"gasLimit":  web3.utils.toHex(gasLimit),
		"to":  token['address'], // send eos
		"value": "0x0",
		//"to":  dest_account, // send eth
		//"value": web3.utils.toHex(send_eth*Math.pow(10, 18)),
		"data": data,
		"chainId": 95788961
	};

	var privKey = new Buffer(my_pravite_key, 'hex');
	var tx = new Tx(rawTransaction);
	tx.sign(privKey);
	var serializedTx = tx.serialize();
	console.log(rawTransaction);

	var receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'));
	console.log('Receipt info:');
	console.log(receipt);
	console.log('transfer fee: ' + receipt['gasUsed'] * gasPrice / Math.pow(10, 18));

	// The balance may not be updated yet, but let's check
	
	balance = await eos.methods.balanceOf(my_account).call();
	console.log('my eos balance after send: ' + balance/Math.pow(10,decimals));
	eth_balance = await web3.eth.getBalance(my_account);
	console.log('my eth balance after send: ' + eth_balance/Math.pow(10, 18));

}
test_transfer();

