let disp = document.getElementById('disp')
let num = document.getElementById('num')
let alphaRow = document.getElementById("alphaRow")
let qRow = document.getElementById("qRow")
let aRow = document.getElementById("aRow")
let zRow = document.getElementById("zRow")
let spaceRow = document.getElementById("spaceRow")
let offMode = document.getElementById("offMode")
let onMode = document.getElementById("onMode")

let specialChar = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', ""]
let qArr = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
let aArr = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
let zArr = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '.com']
let cleanArr = ["ass", "shit", "bastard", "bitch", "bullshit", "butt", "fuck", "goddamn", "nude", "pissing"]
let specialArr = ['CAPS', 'SHIFT', 'PASSWD', 'CLEAN', 'REV']
let [caps, shift, passwd, clean, rev] = [false, false, false, false, false]
let textArr = []
let star = "*"

//SPECIAL CASE OFF MODE
const modeOff = () => {
    if (event.target.textContent === "CAPS") caps = false
    else if (event.target.textContent === "SHIFT") shift = false
    else if (event.target.textContent === "PASSWD") {
        passwd = false
        disp.value = textArr.join("")
    }
    else if (event.target.textContent === "CLEAN") {
        clean = false
        disp.value = textArr.join("")
    }
    else if (event.target.textContent === "REV") {
        rev = false
        disp.value = textArr.join("")
    }
}

//SPECIAL CASE ON MODE
const modeOn = () => {
    if (event.target.textContent === "CAPS") caps = true
    else if (event.target.textContent === "SHIFT") shift = true
    else if (event.target.textContent === "PASSWD") passwd = true
    else if (event.target.textContent === "CLEAN") {
        clean = true
        changeToClean()
    }
    else if (event.target.textContent === "REV") rev = true
}
const changeToRev = () => {
    let text = textArr.join("").split("").reverse()
    disp.value = text.join("")
}

//CELAN MODE ON TO HIDE BAD WORDS
const changeToClean = () => {
    let text = disp.value
    let index = []
    for (let i = 0; i < cleanArr.length; i++) {
        var value = text.indexOf(cleanArr[i])
        if (value !== -1) {
            index.unshift(value)
        }
    }
    text = text.split("")
    for (let j = 0; j < index.length; j++) {
        for (var k = index[j] + 1; k < text.length; k++) {
            if (text[k] !== "\xa0") {
                var last = text[k]
                text[k] = star
            }
            else if (text[k] === "\xa0") {
                break
            }
        }
        text[k - 1] = last
    }
    disp.value = text.join("")
}

//PASSWORD MODE ON TO DISPLAY PASSWORD TYPE(*)
const changeToPasswd = () => {
    let text = disp.value.split("")
    for (let i = 0; i < text.length - 1; i++) {
        text[i] = star
    }
    console.log("hai", text)
    disp.value = text.join("")
}

//DISPLAY ALPHABETS
alphaRow.addEventListener('click', () => {
    if (event.target.id === "spaceRow") {
        disp.value = `${disp.value}\xa0`
        textArr.push(disp.value.slice(-1))
    }
    else if (event.target.class === "alpha") {
        let str = event.target.textContent
        if (caps === false) str = str.toLowerCase();
        else if (caps === true) str = str.toUpperCase();
        disp.value = `${disp.value}${str}`
        textArr.push(disp.value.slice(-1))
        if (passwd === true) changeToPasswd()
        if (rev === true) changeToRev()
        if (clean === true) changeToClean()
    }
    console.log("alphatextval", textArr)
})

//DISPLAY NUMBERS
num.addEventListener('click', () => {
    if (event.target.textContent === "DEL") {
        if (disp.value.slice(-4) === ".com" || disp.value.slice(-4) === ".COM") {
            disp.value = disp.value.slice(0, disp.value.length - 4)
            textArr = disp.value.split("")
        }
        else {
            disp.value = disp.value.slice(0, disp.value.length - 1)
            textArr.pop()
        }
    }
    else {
        if (event.target.class === "numParent") {
            if (shift === false) disp.value = `${disp.value}${event.target.firstChild.textContent}`
            else if (shift === true) {
                disp.value = `${disp.value}${event.target.lastChild.textContent}`
            }
            textArr.push(disp.value.slice(-1))
        }
        else if (event.target.class === "divBot") {
            if (shift === false) disp.value = `${disp.value}${event.target.textContent}`
            else if (shift === true) {
                disp.value = `${disp.value}${event.target.nextSibling.textContent}`
            }
            textArr.push(disp.value.slice(-1))
        }
        else if (event.target.class === "divTop") {
            if (shift === false) disp.value = `${disp.value}${event.target.previousSibling.textContent}`
            else if (shift === true) {
                disp.value = `${disp.value}${event.target.textContent}`
            }
            textArr.push(disp.value.slice(-1))
        }
        if (passwd === true) changeToPasswd()
        if (clean === true) changeToClean()
        if (rev === true) changeToRev()
        console.log("mumtextval", textArr)
    }
})

//RENDER ALPHABET BUTTONS
const allLayout = (Row, Arr) => {
    for (let i = 0; i <= Arr.length - 1; i++) {
        var div1 = document.createElement('div')
        div1.class = "alpha"
        if (Arr === zArr && i === 7) {
            div1.classList.add("font-weight-normal")
        }
        else div1.classList.add("h4")
        div1.style.color = "white"
        div1.style.width = "50px"
        div1.style.height = "50px"
        div1.style.margin = "10px"
        div1.style.background = "black"
        div1.style.padding = "10px"
        div1.textContent = Arr[i]
        Row.append(div1)
    }
}

//RENDER ONMODE AND OFFMODE BUTTONS
const specialLayout = (Mode, sArr) => {
    for (let i = 0; i <= sArr.length - 1; i++) {
        let btn = document.createElement('button')
        btn.type = "button"
        if (Mode === onMode) btn.classList.add("btn", "btn-outline-success", "btn-lg", "rounded-0", "border-dark", "font-weight-bolder")
        else btn.classList.add("btn", "btn-outline-dark", "btn-lg", "rounded-0", "font-weight-bolder")
        btn.style.margin = "10px"
        btn.textContent = sArr[i]
        Mode.append(btn)
    }
}

//RENDER NUMBER BUTTONS
const numLayout = () => {
    for (let i = 1; i <= 11; i++) {
        var div = document.createElement('div')
        div.class = "numParent"
        var divBottem = document.createElement('div')
        divBottem.class = "divBot"
        divBottem.style.position = "absolute"
        var divTop = document.createElement('div')
        divTop.class = "divTop"
        divTop.style.position = "absolute"
        div.style.position = "relative"
        div.style.color = "white"
        div.style.width = "50px"
        div.style.height = "50px"
        div.style.margin = "10px"
        div.style.background = "black"
        divBottem.style.paddingTop = "28px"
        divTop.textContent = specialChar[i - 1]
        divTop.style.paddingLeft = "36px"
        if (i === 10) divBottem.textContent = "0"
        else if (i === 11) {
            divBottem.style.padding = "13px"
            divBottem.textContent = "DEL"
        }
        else {
            divBottem.textContent = i
        }
        div.append(divBottem, divTop)
        num.append(div)
    }
    allLayout(qRow, qArr)
    allLayout(aRow, aArr)
    allLayout(zRow, zArr)
    specialLayout(offMode, specialArr)
    specialLayout(onMode, specialArr)
}

window.addEventListener('load', () => {
    numLayout()
    onMode.addEventListener("click", modeOn)
    offMode.addEventListener("click", modeOff)
})


