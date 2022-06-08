


function getAllAnimeByGenre() { //sort by genre
    let page = 1
    fetch(`https://api.jikan.moe/v4/anime?page=${page}`)
    .then(response => {
        return response.json()
    }) 
    .then(data => {
        console.log('success', data.data[0].genres)
    })
}


function getGenre() {  //get all anime genre
    fetch('https://api.jikan.moe/v4/genres/anime')
    .then(response => {
        return response.json()
    }) 
    .then(data => {
        //console.log('success', data)
        showGenreEach(data.data)
    })
}
function showGenreEach(data) {
    const genres = []
    const genresName = []
    for (let genre of data) {
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
function addGenre(genre) { // home - show categories
    const genreGroup = document.getElementById('genre')
    let box = document.createElement('div')
    box.classList.add('card')
    box.classList.add('d-flex')
    box.classList.add('text-center')
    box.classList.add('col-12')
    box.classList.add('col-sm-6')
    box.classList.add('col-md-4')
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

    box.addEventListener('click', () => {
        console.log(genre.name)
        //getAllAnimeByGenre()
    })

    genreGroup.appendChild(box)
}

document.getElementById('search').addEventListener('click', () => {
    document.getElementById('categories').classList.add('visually-hidden')
    console.log('ok')
    
})

function onLoad() {
    getGenre()
}
window.addEventListener('load', onLoad)