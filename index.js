let touches = new Set();
let timer;

document.addEventListener("touchstart", start);
document.addEventListener("touchend", end);
document.addEventListener("touchmove", move);

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
    resetTimer();
}

function end(e) {
    e.preventDefault();
    for (let i = 0; i < e.changedTouches.length; i++) {
        touches.delete(e.changedTouches[i].identifier);

        let div = document.getElementById(e.changedTouches[i].identifier);
        let tries = 0;
        while (!div && tries < 100) {
            tries++;
            div = document.getElementById(e.changedTouches[i].identifier);
        }
        if (div) div.remove();
    }
    resetTimer();
}

function move(e) {
    e.preventDefault();
    for (let i = 0; i < e.touches.length; i++) {
        let id = e.touches[i].identifier;
        let div = document.getElementById(id);
        let tries = 0;
        if (!div && tries < 100) {
            tries++;
            continue
        }
        if (div) {
            div.style.left = (e.touches[i].clientX - 50) + "px";
            div.style.top = (e.touches[i].clientY - 50) + "px";
        }
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

function explode() {
    const random = Math.floor(Math.random() * touches.size);
    let id = Array.from(touches)[random];

    touches.forEach(touch => {
        if (touch != id) {
            let div = document.getElementById(touch);
            let tries = 0;
            while (!div && tries < 100) {
                tries++;
                div = document.getElementById(touch);
            }
            if (div) div.remove();
        }
    })
    document.getElementById("app").classList.add("exploded");
    document.getElementById("reset").classList.remove("hidden");

    document.removeEventListener("touchstart", start);
    document.removeEventListener("touchend", end);
    document.removeEventListener("touchmove", move);
}

function reset() {
    touches.clear();
    document.getElementById("app").classList.remove("exploded");
    document.getElementById("reset").classList.add("hidden");
    let elements = document.getElementsByClassName("element");
    while (elements.length > 0) {
        elements[0].remove();
    }
    clearTimeout(timer);

    document.addEventListener("touchstart", start);
    document.addEventListener("touchend", end);
    document.addEventListener("touchmove", move);
}

function resetTimer() {
    clearTimeout(timer);
    if (touches.size > 1) {
        timer = setTimeout(explode, 2000);
    }
}
