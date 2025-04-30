fetch("data/timetable.json")
.then((res) => {
  if (!res.ok) throw new Error(response.status)
  return res.text()
})
.then((text) => {
  JSON.parse(text)
})
.catch((e) => {
  console.error("Couldn't Fetch Timetable Data: "+e)
})