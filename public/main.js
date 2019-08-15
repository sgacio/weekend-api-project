class Space_X_Launches {
  constructor(name, description, time, location) {
    this.name = name
    this.description = description
    this.time = time
    this.location = location
  }
}

const main = () => {
  findNasaPhoto()
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



document.addEventListener('DOMContentLoaded', main)