const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '94753b40f7msh63fbab8fa3ee89cp1d8e98jsne42e1c2287aa',
        'x-rapidapi-host': 'visual-crossing-weather.p.rapidapi.com'
    }
};

const weather = async () => {
    const location = document.getElementById("Location")
    const city = document.getElementById("City")
    const celsius = document.getElementById("Celsius")
    const fog = document.getElementById("Fog")
    const search = document.getElementById("Search")
    try {
    let response = await fetch(`https://visual-crossing-weather.p.rapidapi.com/forecast?contentType=json&unitGroup=metric&aggregateHours=24&location=${location.value}&shortColumnNames=true`, options)
    let data = await response.json()
    .then((data) => {
    console.log(data)
    search.innerHTML = `<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
  <span class="visually-hidden" role="status">Loading...</span> Get weather`
  search.className = "btn btn-primary disabled"
  setTimeout(() => {
    const cityKey = Object.keys(data.locations)[0]
    const cityData = data.locations[cityKey]
        city.innerText = cityData.address
        celsius.innerText = `${cityData.currentConditions.temp}℃`
        fog.innerText = `Humidity: ${cityData.currentConditions.humidity}%`
        search.className = "btn btn-primary"
        search.innerHTML = ""
        search.innerText = "Get Weather"
    }, 2000)})
    } catch(error) {
        console.log(error)
        const failAlertDiv = document.getElementById("fail-alert")

        const alert = document.createElement("div")
        alert.className = "alert alert-danger"
        alert.setAttribute("role", "alert")
        alert.innerText = ("Failed to get data, please wait a few minutes and try again.")

        failAlertDiv.appendChild(alert)

        setTimeout(() =>{
            failAlertDiv.innerHTML = ""
        }, 4000)
    }
}