    if (typeof initDebugger === 'undefined') {
    const initDebugger = async function () {
        const tenderlyRegex = new RegExp('dashboard.tenderly.co/tx')
        if (document.body.innerHTML.match(tenderlyRegex)) {
            return
        }

        const injectElement = document.createElement('div')
        injectElement.className = 'debuggerTest'
        injectElement.innerHTML = 'View in Tenderly'

        const regex = new RegExp('0x([a-fA-F0-9]{64})')
        const htmlElementRegex = new RegExp('(?:</[^<]+>)|(?:<[^<]+/>)')



        const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a')
        let textList = []
        for (let i = 0; i < text.length; i++) {
            let promiseArray = [];
            
            // first test the text with the html element regex
            // search for the regex in the text
            // count the number of 0's in the string, if it's greater than 51 then it's likely not a valid transaction hash 
            // exclude candidates that have already been processed
            if (!htmlElementRegex.test(text[i].innerHTML) && text[i].innerHTML.search(regex) === 0 && text[i].innerHTML.length === 66 && text[i].innerHTML.match(/0/g).length < 51 && !textList.includes(text[i].innerHTML)) {
                textList.push(text[i].innerHTML);
                // console.log("hash candidate found! " + text[i].innerHTML)
                // call the RPC to see if the data is a real transaction
                //ethereum and testnets
                promiseArray.push(fetch('https://cloudflare-eth.com/', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                promiseArray.push(fetch('https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                promiseArray.push(fetch('https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                promiseArray.push(fetch('https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                promiseArray.push(fetch('https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                // promiseArray.push(fetch('https://rpc.kintsugi.themerge.dev', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})})); // This is a dead RPC
                promiseArray.push(fetch('https://rpc.kiln.themerge.dev/', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                //Binance Smart Chain (BNB chain) and testnet
                promiseArray.push(fetch('https://bsc-dataseed1.binance.org', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                promiseArray.push(fetch('https://data-seed-prebsc-1-s1.binance.org:8545/', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                //Arbitrum and testnet
                promiseArray.push(fetch('https://arb1.arbitrum.io/rpc', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                promiseArray.push(fetch('https://rinkeby.arbitrum.io/rpc', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                // optimism and testnet
                promiseArray.push(fetch('https://optimism-mainnet.public.blastapi.io', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                promiseArray.push(fetch('https://kovan.optimism.io/', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                // avalanche c-chain and testnet
                promiseArray.push(fetch('https://ava-mainnet.public.blastapi.io/ext/bc/C/rpc', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                promiseArray.push(fetch('https://ava-testnet.public.blastapi.io/ext/bc/C/rpc', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                // fantom and testnet
                promiseArray.push(fetch('https://fantom-mainnet.public.blastapi.io', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                promiseArray.push(fetch('https://ava-testnet.public.blastapi.io/ext/bc/C/rpc', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                // polygon network and testnet
                promiseArray.push(fetch('https://polygon-mainnet.public.blastapi.io', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                promiseArray.push(fetch('https://polygon-testnet.public.blastapi.io', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                // Gnosis chain (formerly xDai)
                promiseArray.push(fetch('https://gnosis-mainnet.public.blastapi.io', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                // RSK mainnet
                promiseArray.push(fetch('https://public-node.rsk.co', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                promiseArray.push(fetch('https://public-node.testnet.rsk.co', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                // POA mainnet and Sokol testnet
                promiseArray.push(fetch('https://core.poanetwork.dev', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                promiseArray.push(fetch('https://sokol.poa.network', {method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify({jsonrpc: '2.0',method: 'eth_getTransactionReceipt',params: [text[i].innerHTML],id: 1})}));
                
                // Need to check if all statuses are OK because Blast API has a limit of 60 calls per minute each chain
                let allStatusesAreok = true;
                let existsOnBlockchain = false;

                await Promise.all(promiseArray).then(async function(response) {
                    let data = await Promise.all(await response.map(res => res.json())).then(data => data);
                    // console.log(data);
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].status !== 200) {
                            allStatusesAreok = false;
                        }
                        if( data[i].result != null ) {
                            existsOnBlockchain = true;
                        }

                    }
                });
                // console.log("all statuses ok?", allStatusesAreok);
                // console.log("exists on blockchain?", existsOnBlockchain);

                if (allStatusesAreok && existsOnBlockchain) {
                    text[i].innerHTML = text[i].innerHTML.replace(regex, '0x$1 <a href="https://dashboard.tenderly.co/tx/0x$1/one-click-debugger">View in Tenderly!</a>')
                } else if (!allStatusesAreok)
                {
                    text[i].innerHTML = text[i].innerHTML.replace(regex, '0x$1 <a href="https://dashboard.tenderly.co/tx/0x$1/one-click-debugger">View in Tenderly!</a>')
                } 
                // else { there's probably not any transaction with this hash on a supported blockchain }
            }
        }
    }

    initDebugger()
}