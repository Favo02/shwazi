let touches = new Set();

function start(e) {
    e.preventDefault();
    console.log("START", e.touches)
    for (let i = 0; i < e.touches.length; i++) {
        touches.add(e.touches[i].identifier);
    }
    console.log(touches);
}

function end(e) {
    e.preventDefault();
    console.log("END", e.touches)
    for (let i = 0; i < e.changedTouches.length; i++) {
        touches.delete(e.changedTouches[i].identifier);
    }
    console.log(touches);
}
