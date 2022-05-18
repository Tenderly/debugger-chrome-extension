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
                text[i].innerHTML = text[i].innerHTML.replace(regex, '0x$1 <a href="https://dashboard.tenderly.co/tx/0x$1/one-click-debugger">View in Tenderly!</a>')
            }
        }
    }

    initDebugger()
}