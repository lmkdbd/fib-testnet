let node_config = require('../config.json').local;
let bp_accounts = require('../../common/bpaccounts.json');
let FIBOS = require('fibos.js');
let test = require('test');
test.setup();
var coroutine = require('coroutine');
let bp_private_array = [];
let auth_list = [];
bp_accounts.forEach(account=>{
    bp_private_array.push(account.private_key);
    auth_list.push({
        authorization:account.account
    });
})
let fibos = FIBOS({
    chainId: node_config.chain_id,
    keyProvider: bp_private_array,
    httpEndpoint: node_config.httpEndpoint,
    logger: {
        log: null,
        error: null
    }
});

describe("fibos", () => {
    it("get bp number", () => {
        var result = fibos.getProducerScheduleSync();
        console.warn('---- result ----', result);
        if (result.proposed != null)
            console.warn('---- the propose size is ----', result.proposed.producers.length);
        if (result.pending != null)
            console.warn('---- the pending size is ----', result.pending.producers.length);
        if (result.active != null)
            console.warn('---- the active size is ----', result.active.producers.length);
    })
    xit("set bp number", () => {
        var ctx = fibos.contractSync("eosio");
        ctx.setconfigSync({
            "type": "bpnumber",
            "value": 101
        }, {
            authorization: "eosio"
        })
    })

    xit("get info", () => {
        let max_irr = 0;
        let min_irr = 1000;
        for(let i = 0; i < 120; i++)
        {
            var result = fibos.getInfoSync();
            var current_irr = result.head_block_num - result.last_irreversible_block_num;
            if (current_irr > max_irr)
                max_irr = current_irr
            if (current_irr < min_irr)
                min_irr = current_irr
            coroutine.sleep(100);
        }
        console.warn('---- min_irr ----', min_irr);
        console.warn('---- max_irr ----', max_irr);
    })
});

require.main === module && test.run(console.DEBUG);