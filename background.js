const server = { ex: "https://exhentai.org", forums: "https://forums.e-hentai.org" };

async function modifyCookie(message, sender, sendResponse) {
    for (const name of ["ipb_member_id", "ipb_pass_hash", "yay", "igneous"]) {
        if (name === "igneous") {
            const igneous = await browser.cookies.get({ url: server.ex, name: name });
            if (igneous.value !== 'mystery') continue;
        }
        await browser.cookies.remove({ url: server.ex, name: name });
    }

    pass_hash = await browser.cookies.get({ url: server.forums, name: "ipb_pass_hash" });
    member_id = await browser.cookies.get({ url: server.forums, name: "ipb_member_id" });
    if (pass_hash && member_id) {
        if (pass_hash.value === "0" || member_id.value === "0") {
            return { success: false, msg: "Cookie is not valid, please log in again" };
        }
        else {
            pass_hash.url = server.ex;
            pass_hash.domain = ".exhentai.org";
            delete pass_hash.hostOnly;
            delete pass_hash.session;
            await browser.cookies.set(pass_hash);

            member_id.url = server.ex;
            member_id.domain = ".exhentai.org";
            delete member_id.hostOnly;
            delete member_id.session;
            await browser.cookies.set(member_id);

            return { success: true, msg: "success" }
        }
    } else {
        return { success: false, msg: "No proper cookies found, please clear cookies and log in again" };
    }
}

browser.runtime.onMessage.addListener(modifyCookie);