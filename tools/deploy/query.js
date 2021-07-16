const FIBOS = require('fibos.js');
var http = require("http");
let test = require('test');
let config = require("./config.json");
let info = http.get(config.httpEndpoint + "/v1/chain/get_info")
let fibos = FIBOS({
    chainId: info.chain_id,
    keyProvider: [],
    httpEndpoint: config.httpEndpoint,
    logger: {
        log: null,
        error: null
    }
});

test.setup();
describe("query", () => {
    it(`query stats`, () => {
        let res = fibos.getTableRowsSync(true, config.name, config.name, "stats");
        console.warn(`---- stats ----`, res);
    });

    it(`query account`, () => {
        let res = fibos.getTableRowsSync(true, config.name, "testnetbppa2", "accounts");
        console.warn(`---- account ----`, res);
    });

    it(`query ctxaccount`, () => {
        let res = fibos.getTableRowsSync(true, config.name, "testnetbppa2", "ctxaccounts");
        console.warn(`---- ctxaccount ----`, res);
    });

    it(`query token`, () => {
        let res = fibos.getTableRowsSync(true, config.name, 1, "tokens");
        console.warn(`---- tokens ----`, res);
    });
});

require.main === module && test.run(console.DEBUG);