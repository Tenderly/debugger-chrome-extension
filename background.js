try {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete') {
            chrome.scripting.insertCSS({
                files: ["add_debugger.css"], target: {
                    tabId: tab.id
                }
            })
            chrome.scripting.executeScript({
                files: ["add_debugger.js"], target: {
                    tabId: tab.id
                }
            })
        }
    })
} catch (e) {
    console.log(e)
}