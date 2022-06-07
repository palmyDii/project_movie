function showGenre() {
    fetch('https://api.jikan.moe/v4/genres/anime')
    .then(response => {
        return response.json()
    }) 
    .then(data => {
        console.log('success', data)
        showGenreEach(data.data)
    })
}

function showGenreEach(data) {
    const genres = []
    const genresName = []
    for (genre of data) {
        let genreName = genre.name
        let genreCount = genre.count

        if (!genresName.includes(genreName)) {
            genresName.push(genreName)
            genres.push({
                name: genreName,
                count: genreCount
            });
        }
    }
    console.log(genres)
    for(each of genres) {
        addGenre(each)
    }
}
function addGenre(genre) { 
    const genreGroup = document.getElementById('genre')
    let box = document.createElement('div')
    box.classList.add('card')
    box.classList.add('d-flex')
    box.classList.add('text-center')
    box.classList.add('col-3')
    box.classList.add('border-info')


    let boxBody = document.createElement('div')
    boxBody.classList.add('card-body')
    box.appendChild(boxBody)

    let name = document.createElement('h5')
    name.classList.add('card-title')
    name.innerText = genre.name
    boxBody.appendChild(name)

    let count = document.createElement('p')
    count.classList.add('card-text')
    count.innerText = '(' + genre.count + ')'
    boxBody.appendChild(count)

    box.appendChild(boxBody)

    genreGroup.appendChild(box)
}

function onLoad() {
    showGenre()
}
window.addEventListener('load', onLoad)