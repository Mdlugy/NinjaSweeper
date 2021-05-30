// var theDojo = [[1, 0, 1, 1, 1, 0, 4, 0, 8, 0],
// [3, 1, 0, 7, 0, 0, 6, 0, 8, 8],
// [5, 0, 7, 0, 3, 6, 6, 6, 0, 0],
// [2, 3, 0, 9, 0, 0, 6, 0, 8, 0],
// [6, 0, 3, 3, 0, 2, 0, 3, 0, 4],
// [0, 0, 3, 3, 0, 0, 2, 2, 3, 0],
// [0, 0, 0, 0, 5, 0, 1, 2, 0, 6],
// [2, 2, 2, 2, 0, 7, 1, 1, 1, 0],
// [5, 2, 0, 2, 0, 0, 0, 1, 1, 2],
// [9, 2, 2, 2, 0, 7, 0, 1, 1, 0]];
var theDojo = []
var dojoDiv = document.querySelector("#the-dojo");
var emptynum = 0
var emptyclick = 0


// Creates the rows of buttons for this game
function render(theDojo) {
    var result = "";
    for (var i = 0; i < theDojo.length; i++) {
        for (var j = 0; j < theDojo[i].length; j++) {
            result += `<button class="tatami"  oncontextmenu ="return false " onmousedown="howMany(event, ${i}, ${j}, this)"></button>`;
        }
    }
    return result;
}

function click(e, i, j, element) {
    console.log("somethings happening")
    if (e.which == 0) {
        console.log(i + j + element)
        howMany(i, j, element)
    }
    if (e.which == 2) { console.log("right click finally works") }
}

function drawDojo(size, dif) {
    // console.log(document.getElementById(size).value)
    var ninjacount = 0
    var dupeCheckArr = []
    var boardsize = parseInt(document.getElementById(size).value)
    var tempDojo = []

    difficulty = document.getElementById(dif).value
    console.log(difficulty)
    if (difficulty == "easy") {
        console.log("picked easy")
        ninjacount = (boardsize * boardsize / 20)
    }
    else if (difficulty == "medium") {
        console.log("picked medium")
        ninjacount = (boardsize * boardsize / 10)
    }
    else if (difficulty == "hard") {
        ninjacount = (boardsize * boardsize / 5)
    }
    else { ninjacount = (boardsize * boardsize / 2) }

    for (var i = 0; i < boardsize; i++) {
        tempDojo[i] = []
        for (var j = 0; j < boardsize; j++) {
            tempDojo[i][j] = 0

        }
    }

    for (var k = 0; k < ninjacount; k++) {
        var m = Math.floor(Math.random() * boardsize);

        var n = Math.floor(Math.random() * boardsize);
        if (dupeCheckArr.includes([i, j])) {
            while (dupeCheckArr.includes[i, j]) {
                m = Math.floor(Math.random() * boardsize);
                n = Math.floor(Math.random() * boardsize);
            }
        }

        dupeCheckArr[k] = [m, n]
        tempDojo[m][n] = 1
    }
    document.getElementById("the-dojo").style.width = boardsize * 32 + "px"
    dojoDiv.innerHTML = render(tempDojo)
    console.table(tempDojo);
    theDojo = tempDojo

    for (var i = 0; i < boardsize; i++) {
        for (var j = 0; j < boardsize; j++) {
            if (tempDojo[i][j] == 0) { emptynum++ }
        }
    }
    console.log(emptynum)

}
function restart() {

    emptynum = 0
    emptyclick = 0
    drawDojo("size", "difficulty")
}

function howMany(e, i, j, element) {
    if (e.which == 3) {
        flag(element)
        return
    }
    if (element.classList.contains("flag")) { return }

    var ninjaNum = 0
    emptyclick++
    console.log("emptyclick" + emptyclick)
    for (var k = -1; k <= 1; k++) {
        var m = i + k
        console.log(m)
        if (m == -1 || m == theDojo.length) { ninjaNum = ninjaNum }
        else {
            for (var l = -1; l <= 1; l++) {
                var n = j + l
                if (theDojo[m][n] != undefined) {
                    if (m != i || n != j) {
                        console.log(m); console.log(n)
                        ninjaNum = ninjaNum + theDojo[m][n];
                    }
                    else { ninjaNum = ninjaNum }
                }
                else {
                    ninjaNum = ninjaNum
                }
            }
        }
    }
    if (theDojo[i][j] == 1) {
        element.innerHTML = "<img src = 'ninja.jpg'>"
        var restartloss = window.confirm("you lose :(   restart?")
        if (restartloss == true) { restart() }


    }
    console.log({ i, j });
    element.innerHTML = ninjaNum
    element.classList.add("clickeddown");
    element.onmousedown = ""
    win()
}
function flag(element) {
    if (element.classList.contains("flag")) { element.classList.remove("flag") }
    else { element.classList.add("flag") }
}
function win() {
    if (emptyclick == emptynum) {
        var restartwin = window.confirm("you win!!! Play again?")
        if (restartwin == true) { restart() }
    }

}
// var style = "color:cyan;font-size:1.5rem;font-weight:bold;";
// console.log("%c" + "IF YOU ARE A DOJO STUDENT...", style);
// console.log("%c" + "GOOD LUCK THIS IS A CHALLENGE!", style);
// shows the dojo for debugging purposes

// adds the rows of buttons into <div id="the-dojo"></div>
// dojoDiv.innerHTML = render(theDojo);

