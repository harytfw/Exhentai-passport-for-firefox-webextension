const server = { ex: "https://exhentai.org", forums: "https://forums.e-hentai.org" };

function modifyCookie(request) {
    function sendMessage(response) {
        browser.tabs.sendMessage(tab.id, response)
    }
    let pass_hash = null;
    let member_id = null;
    let tab = null
    browser.tabs.query({ active: true }).then((tabs) => {
        tab = tabs[0];
        for (let name of ["ipb_member_id", "ipb_pass_hash", "yay"]) {
            browser.cookies.remove({ url: server.ex, name: name });
        }
        return new Promise((resolve) => { resolve() })
    }).then(() => {
        return browser.cookies.get({ url: server.forums, name: "ipb_pass_hash" })
    }).then((cookie) => {
        pass_hash = cookie;
        return browser.cookies.get({ url: server.forums, name: "ipb_member_id" });
    }).then((cookie) => {
        member_id = cookie;
        return new Promise((resolve, reject) => {
            if (pass_hash && member_id) {
                if (pass_hash.value === "0" || member_id.value === "0") sendMessage({ status: 1, success: false, info: "Cookie is not valid, please login again" });
                else resolve(true);
            } else {
                sendMessage({ status: 2, success: false, info: "No propery cookie found, click OK to open login page" });
            }
        });
    }).then(() => {
        pass_hash.url = server.ex;
        pass_hash.domain = ".exhentai.org";
        delete pass_hash.hostOnly;
        delete pass_hash.session;
        return browser.cookies.set(pass_hash);
    }).then(() => {
        member_id.url = server.ex;
        member_id.domain = ".exhentai.org";
        delete member_id.hostOnly;
        delete member_id.session;
        return browser.cookies.set(member_id);
    }).then(() => {
        sendMessage({ success: true, info: "success" })
    }).catch((error) => {
        console.log(error);
    });
}

browser.runtime.onMessage.addListener(modifyCookie);