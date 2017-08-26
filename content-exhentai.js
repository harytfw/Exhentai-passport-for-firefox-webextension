function handler(msg) {
    if (msg.success) {
        location.reload();
    } else {
        if (msg.status === 1) {
            location.reload();
        } else if (msg.status === 2 && confirm(msg.info)) {
            location.href = "https://forums.e-hentai.org/index.php?act=Login&CODE=00";
        };
    }
};
browser.runtime.onMessage.addListener(handler);

let panda = document.querySelector("img[src='https://exhentai.org/']");
if (panda) {
    panda.style.cursor = "pointer";
    panda.addEventListener("click", () => {
        browser.runtime.sendMessage({ hello: "world" });
    });
}