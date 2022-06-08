function getAnimeSearch(searchWord) { //search anime by name
    fetch(`https://api.jikan.moe/v4/anime?q=${searchWord}&page=1`)
    //fetch(`https://api.jikan.moe/v4/seasons/2018/summer`)
    .then(response => {
        return response.json()
    }) 
    .then(data => {
        console.log('success', data.data)
        for(let anime of data.data) {
            addSearch(anime)
        }
    })
}
function addSearch(data) { //search - add result to display
    const searchResult = document.getElementById('serchResult')

    let box = document.createElement('div')
    box.classList.add('d-flex')
    box.classList.add('col-lg-2')
    box.classList.add('col-md-3')
    box.classList.add('col-sm-4')
    box.classList.add('col-5')
    box.classList.add('my-2')

    let boxBody = document.createElement('div')
    boxBody.classList.add('card')
    box.appendChild(boxBody)
   
    let image = document.createElement('img')
    image.classList.add('card-img-top')
    image.setAttribute('src', data.images.jpg.image_url)
    boxBody.appendChild(image)

    let textBody = document.createElement('div')
    textBody.classList.add('card-body')
    textBody.classList.add('d-flex')
    textBody.classList.add('row')
    textBody.classList.add('align-content-between')

    let text = document.createElement('p')
    text.classList.add('card-text')
    text.innerText = data.title
    textBody.appendChild(text)


    let likeBox = document.createElement('div')
    likeBox.classList.add('d-flex')
    likeBox.classList.add('justify-content-end')
    


    let like = document.createElement('button')
    like.classList.add('btn')
    let likeIcon = document.createElement('i')
    likeIcon.classList.add('bi')
    likeIcon.classList.add('bi-heart')
    like.appendChild(likeIcon)
    likeBox.appendChild(like)

    textBody.appendChild(likeBox)

    boxBody.appendChild(textBody)
    box.appendChild(boxBody)

    searchResult.appendChild(box)
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
function showGenreEach(data) { //display genre each box
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
function addGenre(genre) { // home - display categories
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
function getAllAnimeByGenre() { //click to sort by genre
    let page = 1
    fetch(`https://api.jikan.moe/v4/anime?page=${page}`)
    .then(response => {
        return response.json()
    }) 
    .then(data => {
        //console.log('success', data.data[0].genres)
    })
}


document.getElementById('search').addEventListener('click', () => {
    document.getElementById('categories').classList.add('visually-hidden')

    let searchWord = document.getElementById('searchWord').value
    console.log(searchWord)
    document.getElementById('serchResult').innerHTML = ''
    getAnimeSearch(searchWord)
})

function onLoad() {
    getGenre()
}
window.addEventListener('load', onLoad)