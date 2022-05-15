let index = 0
let textList = []

function add(){
    let text = document.getElementById("text").value
    let time = document.getElementById("time").value === ""?"00:00:00":document.getElementById("time").value
    let duration = document.getElementById("addtime").value === ""?"0":document.getElementById("addtime").value
    let totaltime = parseInt(time.substring(0,2))*3600+parseInt(time.substring(3,5))*60+parseInt(time.substring(6,8))
    totaltime += parseInt(duration)
    let secondstime = totaltime%60 < 10?"0"+JSON.stringify(totaltime%60):JSON.stringify(totaltime%60)
    let minutestime = Math.floor(totaltime/60)%60 < 10?"0"+JSON.stringify(Math.floor(totaltime/60)%60):JSON.stringify(Math.floor(totaltime/60)%60)
    let hourstime = Math.floor(totaltime/3600) < 10?"0"+JSON.stringify(Math.floor(totaltime/3600)):JSON.stringify(Math.floor(totaltime/3600))
    let finaltime = hourstime+":"+minutestime+":"+secondstime
    textList.push(
        {
            subindex: index,
            subtime: time,
            subfinaltime: finaltime,
            subtext: text
        }
    )
    document.getElementById("time").value = finaltime
    index += 1
    update()
}

function update(){
    let column = document.getElementById("column")
    column.innerHTML = ""
    textList.forEach(subtitle => {
        let centraldiv = document.createElement("div")
        centraldiv.setAttribute("class", "divgrid")
        let divcheck = document.createElement("div")
        divcheck.setAttribute("class", "checkmark")
        divcheck.innerHTML = "x"
        divcheck.onclick = function(){
            erase(subtitle.subindex)
        }
        let divindex = document.createElement("div")
        divindex.innerHTML = parseInt(subtitle.subindex)+1
        let divtime = document.createElement("div")
        divtime.setAttribute("class", "tempolegenda")
        divtime.innerHTML = subtitle.subtime+" - "+subtitle.subfinaltime
        let divtext = document.createElement("div")
        divtext.innerHTML = subtitle.subtext
        centraldiv.append(divcheck, divindex, divtime, divtext)
        column.append(centraldiv)
    })
}

function reset(){
    textList = []
    index = 0
    document.getElementById("column").innerHTML = "<div>Nada por enquanto...</div>"
}

function erase(x){
    textList.splice(x,1)
    for(i=x; i<textList.length; i++){
        textList[i].subindex -= 1
    }
    index -= 1
    if(textList.length === 0){
        reset()
        return
    }
    update()
}

window.onkeypress = function(event) {
    if (event.keyCode == 13) {
        event.preventDefault()
        add()
    }
}