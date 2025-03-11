let touches = new Set();

function start(e) {
    e.preventDefault();
    for (let i = 0; i < e.touches.length; i++) {
        let id = e.touches[i].identifier;
        if (touches.has(id)) {
            continue;
        }
        touches.add(e.touches[i].identifier);
        addElement(e.touches[i].clientX, e.touches[i].clientY, e.touches[i].identifier);
    }
}

function end(e) {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
        touches.delete(e.changedTouches[i].identifier);

        let div = document.getElementById(e.changedTouches[i].identifier);
        while (!div) {
            div = document.getElementById(e.changedTouches[i].identifier);
        }
        div.remove();
    }
}

function move(e) {
    e.preventDefault();
    for (let i = 0; i < e.touches.length; i++) {
        let id = e.touches[i].identifier;
        let div = document.getElementById(id);
        if (!div) {
            continue
        }
        div.style.left = (e.touches[i].clientX - 50) + "px";
        div.style.top = (e.touches[i].clientY - 50) + "px";
    }
}

function addElement(x, y, id) {
    let element = document.createElement("div");
    element.id = id;
    element.classList.add("element");
    element.style.left = (x - 50) + "px";
    element.style.top = (y - 50) + "px";
    document.body.appendChild(element);
}
