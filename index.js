let touches = new Set();

function start(e) {
    e.preventDefault();
    console.log("START", e.touches)
    for (let i = 0; i < e.touches.length; i++) {
        let id = e.touches[i].identifier;
        if (touches.has(id)) {
            continue;
        }
        touches.add(e.touches[i].identifier);
        addElement(e.touches[i].clientX, e.touches[i].clientY, e.touches[i].identifier);
    }
    console.log(touches);
}

function end(e) {
    e.preventDefault();
    console.log("END", e.touches)
    for (let i = 0; i < e.changedTouches.length; i++) {
        touches.delete(e.changedTouches[i].identifier);

        console.log(e.changedTouches[i].identifier);
        let div = document.getElementById(e.changedTouches[i].identifier);
        while (!div) {
            div = document.getElementById(e.changedTouches[i].identifier);
        }
        div.remove();
    }
    console.log(touches);
}

function addElement(x, y, id) {
    let element = document.createElement("div");
    element.id = id;
    element.classList.add("element");
    element.style.left = (x - 50) + "px";
    element.style.top = (y - 50) + "px";
    document.body.appendChild(element);
}
