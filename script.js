let dayOffset = 0
let colorsData
let timetableData

async function getJSON(url) {
  return fetch(url)
    .then((response)=>response.json())
    .then((text)=>{return (text)})
    .catch((e) => {
      console.error(`Failed to load ${url}: ${e}`)
      window.setTimeout(()=>{window.location.reload()}, 5000)
    })
}

async function loadJSON() {
  colorsData = await getJSON("data/colors.json")
  timetableData = await getJSON("data/timetable.json")
  displayTimetable()
  window.setInterval(displayTimetable, 10000)
}

function displayTimetable() {
  // Setup Date
  const date = new Date()
  console.log(date.getHours().toString()+":"+date.getMinutes().toString())
  const day = date.getDay() + dayOffset
  if (day == 0 || day == 6) {
    document.getElementById("subjects").innerHTML = "<p style='color: white;text-align: center;font-size: 1.5em;'>No school today.</p>"
    return
  }

  // Add Subjects To Page
  let timetable = timetableData[day]
  let timetableKeys = Object.keys(timetable)
  let timetableValues = Object.values(timetable)
  let timetableHTML = ""
  for (let i = 0; i < timetableKeys.length; i++) {
    const backgroundColor = colorsData[timetableValues[i].toLowerCase()]
    const subjecttime = parseFloat(timetableKeys[i])
    var nowtime;
    if (date.getMinutes() < 10) {
      nowtime = parseFloat((date.getHours().toString() + ".0" + date.getMinutes().toString()))
    } else {
      nowtime = parseFloat((date.getHours().toString() + "." + date.getMinutes().toString()))
    }
    if (subjecttime < nowtime) {
      if (nowtime < parseFloat(timetableKeys[i+1])) {
        timetableHTML += `<p class="subjectnow" style="background-color:${backgroundColor};">${timetableValues[i]}</p><p class="subjecttime">${timetableKeys[i]}</p></br>`
      } else {
        timetableHTML += `<p class="subjectend"">${timetableValues[i]}</p><p class="subjecttime">${timetableKeys[i]}</p></br>`
      }
    } else {
        timetableHTML += `<p class="subjectstart" style="background-color: ${backgroundColor};">${timetableValues[i]}</p><p class="subjecttime">${timetableKeys[i]}</p></br>`
    }
  }

  // Display Subjects
  document.getElementById("subjects").innerHTML = timetableHTML
}

// Initilize Timetable From JSON
loadJSON()
