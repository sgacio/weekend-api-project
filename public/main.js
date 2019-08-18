const main = () => {
  findNasaPhoto()
  getSpaceXMissions()
}

const findNasaPhoto = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(response => {
      return response.json()
    }).then(nasaPhoto => {
      displayPhoto(nasaPhoto)
    })
}

const displayPhoto = (nasaPhoto) => {
  document.querySelector('.picture-background').style.backgroundImage = `url('${nasaPhoto.hdUrl}')`
  document.querySelector('.copy-right').textContent = `copyright: ${nasaPhoto.copyright} | title: ${nasaPhoto.title}`
}

class Flights {
  constructor(name, details, time, location, container, nameBox, detailsBox, timeBox, locationBox) {
    this.name = name
    this.details = details
    this.time = time
    this.location = location
    this.container = container
    this.nameBox = nameBox
    this.detailsBox = detailsBox
    this.timeBox = timeBox
    this.locationBox = locationBox
  }
}

const spaceFlights = []
let currentFlight = 0

const getSpaceXMissions = async () => {
  const response = await fetch(`https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming`)
  const missionData = await response.json()

  missionData.forEach(mission => {
    const cardContainer = document.createElement('div')
    const cardTitle = document.createElement('h2')
    const cardDetails = document.createElement('p')
    const cardTime = document.createElement('p')
    const cardLocation = document.createElement('p')

    // This is setting up each mission name //
    const missionName = mission.mission_name

    // This will cover the mission details //
    const missionDetails = mission.details ? mission.details : 'No description available yet.'

    // This will cover the mission timer //
    const missionTimer = mission.launch_date_utc

    // This will cover the mission location //
    const missionLocation = mission.launch_site.site_name_long

    const flights = new Flights(missionName, missionDetails, missionTimer, missionLocation, cardContainer, cardTitle, cardTime, cardDetails, cardLocation)
    console.log(spaceFlights)
    spaceFlights.push(flights)
  })
  letsDisplayThis()
}

const letsDisplayThis = () => {
  console.log(spaceFlights[currentFlight])
  const mainContainer = document.querySelector('#container')

  mainContainer.textContent = ''
  spaceFlights[currentFlight].container.classList.add('main-container')

  spaceFlights[currentFlight].nameBox.textContent = spaceFlights[currentFlight].name
  spaceFlights[currentFlight].nameBox.classList.add('name')
  spaceFlights[currentFlight].nameBox.classList.add('fas')
  spaceFlights[currentFlight].nameBox.classList.add('fa-space-shuttle')

  spaceFlights[currentFlight].detailsBox.textContent = spaceFlights[currentFlight].details
  spaceFlights[currentFlight].detailsBox.classList.add('card-style')

  spaceFlights[currentFlight].timeBox.textContent = spaceFlights[currentFlight].time
  spaceFlights[currentFlight].timeBox.classList.add('card-style')

  spaceFlights[currentFlight].locationBox.textContent = spaceFlights[currentFlight].location

  spaceFlights[currentFlight].container.appendChild(spaceFlights[currentFlight].nameBox)
  spaceFlights[currentFlight].container.appendChild(spaceFlights[currentFlight].detailsBox)
  spaceFlights[currentFlight].container.appendChild(spaceFlights[currentFlight].timeBox)
  spaceFlights[currentFlight].container.appendChild(spaceFlights[currentFlight].locationBox)

  mainContainer.appendChild(spaceFlights[currentFlight].container)
}

const rightArrow = () => {
  if (currentFlight === spaceFlights.length - 1) {
    currentFlight = 0
  } else {
    currentFlight++
  }
  letsDisplayThis()
}

const leftArrow = () => {
  if (currentFlight === 0) {
    currentFlight = spaceFlights.length - 1
  } else {
    currentFlight--
  }
  letsDisplayThis()
}

document.querySelector('.left-arrow').addEventListener('click', leftArrow)
document.querySelector('.right-arrow').addEventListener('click', rightArrow)
document.addEventListener('DOMContentLoaded', main)