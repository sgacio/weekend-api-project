const main = () => {
  findNasaPhoto()
}

const findNasaPhoto = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(response => {
      return response.json()
    }).then(nasaPhoto => {
      console.log(nasaPhoto.hdUrl)
      document.querySelector('.picture-background').style.backgroundImage = `url('${nasaPhoto.hdUrl}')`
      document.querySelector('.copy-right').textContent = `copyright: ${nasaPhoto.copyright} | title: ${nasaPhoto.title}`
    })
}

document.addEventListener('DOMContentLoaded', main)