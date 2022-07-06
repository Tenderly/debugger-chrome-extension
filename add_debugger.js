if (typeof initDebugger === 'undefined') {
    const initDebugger = function () {
        const tenderlyRegex = new RegExp('dashboard.tenderly.co/tx')
        if (document.body.innerHTML.match(tenderlyRegex)) {
            return
        }

        const injectElement = document.createElement('div')
        injectElement.className = 'debuggerTest'
        injectElement.innerHTML = 'View in Tenderly'

        const regex = new RegExp('0x([a-f0-9]{64})')
        const htmlElementRegex = new RegExp('(?:</[^<]+>)|(?:<[^<]+/>)')

        const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a')
        for (let i = 0; i < text.length; i++) {
            if (!htmlElementRegex.test(text[i].innerHTML) && text[i].innerHTML.search(regex) === 0) {
                // call the RPC to see if the data is a real transaction
                const transactionReceipt = await fetch('https://cloudflare-eth.com/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        jsonrpc: '2.0',
                        method: 'eth_getTransactionReceipt',
                        params: [text[i].innerHTML],
                        id: 1
                    })
                });
                // get the data from the response
                const transactionReceiptJSON = await transactionReceipt.json();

                if(transactionReceipt.status === 200 && transactionReceiptJSON.result !== null) {
                    text[i].innerHTML = text[i].innerHTML.replace(regex, '0x$1 <a href="https://dashboard.tenderly.co/tx/0x$1/one-click-debugger">View in Tenderly!</a>')
                }
                else if(transactionReceipt.status != 200) {
                    text[i].innerHTML = text[i].innerHTML.replace(regex, '0x$1 <a href="https://dashboard.tenderly.co/tx/0x$1/one-click-debugger">View in Tenderly!</a>')
                }
                // else do nothing
            }
        }
    }

    initDebugger()
}