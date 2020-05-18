const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain');
const uuid = require("uuid");
const port = process.argv[2];
const rp = require('/request-promise');

const id = uuid.v1().split('-').join(' ');




const bitcoin = new Blockchain();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// End point to Get entire blockchain on local host
app.get('/blockchain', function (req, res) {
	res.send(bitcoin);
 
});



// End point to create new transaction from Postman and get it on app.js
app.post('/transaction', function (req, res) {
	const blockIndex = bitcoin.createNewTransaction(req.body.amount, req.body.sender, req.body.recipient);
	console.log(req.body);
	res.json({note: `The transaction will be added to block number ${blockIndex}. `});
});



// End point to mine a block

app.get('/mine', function (req, res) {
	const lastBlock = bitcoin.getLastBlock();
	const previousBlockHash = lastBlock['hash'];
	const CurrentBlockdata = {
		transactions: bitcoin.pendingTransactions,
		index: lastBlock['index'] + 1
	};

	const nonce = bitcoin.proofOfWork(previousBlockHash, CurrentBlockdata);
	const blockHash = bitcoin.hashBlock(previousBlockHash, CurrentBlockdata, nonce);

	bitcoin.createNewTransaction(12.5, '00', id);


	const newBlock = bitcoin.createNewBlock(nonce, previousBlockHash, blockHash);
	res.json({
		note: "New block mined successfully",
		block: newBlock
	});
		
});


app.post('/register-and-broadcast-node', function (req, res) {
	const newNodeUrl = req.body.newNodeUrl;
	if (bitcoin.networkNodes.indexOf(newNodeUrl) == -1) bitcoin.networkNodes.push(newNodeUrl);

	const regNodesPromises = [];
	bitcoin.networkNodes.forEach(networkNodeUrl => {

		const requestOptions = {
			uri: networkNodeUrl + '/register-node',
			method: 'POST',
			body: { newNodeUrl: newNodeUrl },
			json: true
		};

		regNodesPromises.push(rp(requestOptions));

	});

	Promise.all(regNodesPromises)
	.then(data => {
		const bulkRegisterOptions = {
			uri: networkNodeUrl + 'register-nodes-bulk',
			method: 'POST',
			body: { alNetworkNodes: [...bitcoin.networkNodes, bitcoin.currentNodeUrl]},
			json: true
		};

		return rp(bulkRegisterOptions);

	});

	.then(data => {
		res.json({note: 'New node registered with network successfully'});

	});

});

app.post('/register-node', function (req, res) {
	// const newNodeUrl = req.body.newNodeUrl;

});

app.post('/register-nodes-bulk', function (req, res) {
	// const newNodeUrl = req.body.newNodeUrl;

});



app.listen(port, function() {
	console.log(`isteing on port ${port}....`);
});