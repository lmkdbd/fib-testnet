let test = require('test');
var config = require('./config.json');
var FIBOS = require('fibos.js');
var fs = require('fs');
let path = require('path');
test.setup();
let name = config.name;
let fibos = FIBOS({
    chainId: config.chain_id,
    keyProvider: [config.private_key, "5J9EZjojERQHCXFt9GXnC8S7SzL5dn4VBxJ5NtVdtvVX6YiQPw8"],
    httpEndpoint: config.httpEndpoint,
    logger: {
        log: null,
        error: null
    }
});

describe("fibos", () => {
    xit('update eosio.code to eosio.nft', () => {
		fibos.updateauthSync({
			account: 'eosio.nft',
			permission: 'active',
			parent: 'owner',
			auth: {
				threshold: 1,
				keys: [{
					key: config["public_key"],
					weight: 1
				}],
				accounts: [{
					"permission": {
						"actor": "eosio.nft",
						"permission": "eosio.code"
					},
					"weight": 1
				}],
				waits: []
			}
		});
	});
    xit("set code", ()=>{
        fibos.setabiSync(name, JSON.parse(fs.readFile(path.resolve(__dirname, `../build/nft/nft.abi`))));
        fibos.setcodeSync(name, 0, 0, fs.readFile(path.resolve(__dirname, `../build/nft/nft.wasm`)));
        var c = fibos.getCodeSync(name, true);
        assert.isNotNull(c.code_hash);
        c = fibos.getAbiSync(name)
		assert.isNotNull(c.abi);
    });

	it("buyram", ()=>{
		fibos.buyramSync({
			payer: "testnetbppa2",
			receiver: "testnetbppa2",
			quant: "2000.0000 FO"
		}, {
			"authorization": "testnetbppa2"
		});
    });

	it("buynet", ()=>{
		fibos.delegatebwSync({
			from: "testnetbppa2",
			receiver: "testnetbppa2",
			stake_net_quantity: '200.0000 FO',
			stake_cpu_quantity: '200.0000 FO',
			transfer: 0
		}, {
			"authorization": "testnetbppa2"
		});
    });
});

require.main === module && test.run(console.DEBUG);