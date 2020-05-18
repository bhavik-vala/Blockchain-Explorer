const sha256 = require('sha256');
const currentNodeUrl = process.argv[3];

function Blockchain() {
	this.chain = [];
	this.pendingTransactions = [];


	this.currentNodeUrl = currentNodeUrl;
	this.networkNodes = [];



	this.createNewBlock(100, 'GENBLOCK', '0');
}


Blockchain.prototype.createNewBlock = function (nounce, previousBlockHash, hash) {

	const newBlock = {
		index: this.chain.length + 1,
		timestamp: Date.now(),
		transactions: this.pendingTransactions,
		nounce: nounce,
		hash: hash,
		previousBlockHash: previousBlockHash,
	};

	this.pendingTransactions = [];
	this.chain.push(newBlock);

	return newBlock;
}



Blockchain.prototype.getLastBlock = function() {

	return this.chain[this.chain.length - 1];
}


Blockchain.prototype.createNewTransaction = function (amount, sender, recipient){
	const newTransaction = {
		amount: amount,
		sender: sender,
		recipient: recipient,

	};

	this.pendingTransactions.push(newTransaction);

	return this.getLastBlock()['index'] +1;

}



Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockdata, nounce) {
	const dataAsString = previousBlockHash + nounce.toString() + JSON.stringify(currentBlockdata);
	const hash = sha256(dataAsString);
	return hash;

}

Blockchain.prototype.proofOfWork = function(previousBlockHash, currentBlockdata) {
	var nounce = 0;
	var hash = this.hashBlock(previousBlockHash,currentBlockdata,nounce);

	while (hash.substring(0, 4) !== '0000'){
		nounce ++;
		hash = this.hashBlock(previousBlockHash,currentBlockdata,nounce)
		// console.log(hash)

	}

	return nounce;

}



module.exports = Blockchain;

