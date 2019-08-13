function handler(res) {
    if (res.success) {
        location.reload();
    }
    else if (!res.success && res.msg) {
        document.getElementById("msg").textContent = "Error Message: " + res.msg;
    }

};

let rebirth = document.querySelector("img[src='https://exhentai.org/img/kokomade.jpg']");
if (rebirth) {
    browser.runtime.sendMessage({ message: "" }).then(handler, (err) => console.error(err));
    rebirth.style.cursor = "pointer";
    rebirth.style.opacity = ".6";
    let div = document.createElement('div');
    div.setAttribute('style', 'position: absolute; top: 0; width: 100%;margin-top: 0px; font-size: 16px;text-align:center;')
    div.innerHTML = `<p>Firstly, Log into the <a href="https://forums.e-hentai.org/index.php?act=Login&CODE=00" target="_blank" style="color: #44a4f4;">E-Hentai Forums</a><p>
 <p>After successful login, <span style="color:red">REFRESH</span> this page.</p>
 <p>If you\'re lucky,you can get into ExHentai.</p>
 <p>Clear cookie may help you solve some problems</p>
 <p id="msg" />`
    document.body.appendChild(div)

}

