// Original JS code
// const year = document.getElementById("year")
// const thisYear = new Date().getFullYear()
// year.setAttribute('datetime', thisYear)
// year.textContent = thisYear

// solution to TS
const year = document.getElementById('year') as HTMLSpanElement // I know it is span element
// without inserting "as HTMLSpanElement" or "as HTMLElement" TS warns me that year could be null
const thisYear: string = new Date().getFullYear().toString()
year.setAttribute('datetime', thisYear)
year.textContent = thisYear
