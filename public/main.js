class Space_X_Launches {
  constructor(name, description, time, location) {
    this.name = name
    this.description = description
    this.time = time
    this.location = location
  }
}

let spaceXFlights = []

const main = () => {
  findNasaPhoto()
  getSpaceXMissions()
}

const findNasaPhoto = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(response => {
      return response.json()
    }).then(nasaPhoto => {
      document.querySelector('.picture-background').style.backgroundImage = `url('${nasaPhoto.hdUrl}')`
      document.querySelector('.copy-right').textContent = `copyright: ${nasaPhoto.copyright} | title: ${nasaPhoto.title}`
    })
}

const getSpaceXMissions = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(response => {
      return response.json()
    }).then(missionData => {
      console.log(missionData)
      spaceXFlights = missionData.map(missionData => new Space_X_Launches(missionData.mission_name, missionData.details, missionData.launch_date_unix, missionData.launch_site.site_name_long))
      // document.getElementById('name-of-mission').textContent = spaceXFlights[0].name
      // document.getElementById('description-of-mission').textContent = spaceXFlights[0].description
      // document.getElementById('countdown-clock').textContent = spaceXFlights[0].time
      // document.getElementById('location-of-launch').textContent = spaceXFlights[0].location
      makeSpaceXCards(spaceXFlights)
    })
}
const makeSpaceXCards = spaceXFlights => {
  document.getElementById('name-of-mission').textContent = spaceXFlights[0].name
  document.getElementById('description-of-mission').textContent = spaceXFlights[0].description
  document.getElementById('countdown-clock').textContent = spaceXFlights[0].time
  document.getElementById('location-of-launch').textContent = spaceXFlights[0].location
}
document.addEventListener('DOMContentLoaded', main)