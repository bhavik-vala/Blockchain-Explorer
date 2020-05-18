const Blockchain = require ('./blockchain');

const bitcoin = new Blockchain();

bitcoin.createNewBlock(100, 'fasfafasd', 'fasdfafas');

bitcoin.createNewBlock(200, 'fasfafasd', 'fasdfafas');



// const previousBlockHash = '0000kofnadknfoadfa';

// const currentBlockdata = [
// 	{
// 		amount: 100,
// 		sender: 'Alkangkad',
// 		recipient: 'Basfasdfds'
// 	},

// 	{
// 		amount: 200,
// 		sender: 'Clkangkad',
// 		recipient: 'Dasfasdfds'
// 	},

// 	{
// 		amount: 300,
// 		sender: 'Elkangkad',
// 		recipient: 'Fasfasdfds'
// 	}

// ];



console.log(bitcoin);



























// bitcoin.createNewBlock('10', '1111asfsgnadngad', '1111ksdgnadngad');
// bitcoin.createNewTransaction(1, 'BHAVIKjsdnfjadsnjds', 'SATOSIlsdfnda');

// bitcoin.createNewBlock('20', '2222adsfadfds', '2222grthrthrt');
// bitcoin.createNewTransaction(25, 'BHAVIKjsdnfjadsnjds', 'SATOSIlsdfnda');
// bitcoin.createNewTransaction(50, 'BHAVIKjsdnfjadsnjds', 'SATOSIlsdfnda');
// bitcoin.createNewTransaction(100, 'BHAVIKjsdnfjadsnjds', 'SATOSIlsdfnda');

// bitcoin.hashBlock('0000afsdfafsd', '')

// bitcoin.createNewBlock('30', '3333adsfadfds', '33330rthrthrt');
// console.log(bitcoin.chain[2]);



// Blockchain.prototype.hashBlock = function(previousBlockHash, currentBlockdata, nounce) {
// 	const dataAsString = previousBlockHash + nounce.toString() + JSON.stringify(currentBlockdata);
// 	const hash = sha256(dataAsString);
// 	return hash;

// }


// bitcoin.createNewBlock('1', 'osgnaognodangad', '0')
// bitcoin.createNewBlock('2', 'dgadgdfgdgd', 'osgnaognodangad')
// bitcoin.createNewBlock('3', 'rgiomdgimdafigf', 'irejijerf')
// bitcoin.createNewBlock('4', 'poqjwnjkdfsd', 'rgiomdgimdafigf')


// Blockchain.prototype.createNewTransaction = function (amount, sender, recipient){
// 	const newTransaction = {
// 		amount: amount,
// 		sender: sender,
// 		recipient: recipient,

// 	};

// 	this.newTransactions.push(newTransaction);
// 	return this.getLastBlock()['index'] +1;

// }