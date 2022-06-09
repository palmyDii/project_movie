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

    let box = document.createElement('div') //1
    box.classList.add('col')
    
    let boxBody = document.createElement('div') //2
    boxBody.classList.add('card')
    boxBody.classList.add('h-100')
    box.appendChild(boxBody)
   
    let image = document.createElement('img') //3
    image.classList.add('card-img-top')
    image.setAttribute('src', data.images.jpg.image_url)
    boxBody.appendChild(image)

    let textBody = document.createElement('div') //3
    textBody.classList.add('card-body')
    textBody.classList.add('d-flex')
    textBody.classList.add('row')
    textBody.classList.add('align-content-between')

    let text = document.createElement('p') //4
    text.classList.add('card-text')
    text.innerText = data.title
    textBody.appendChild(text)

    let likeBox = document.createElement('div') //4
    likeBox.classList.add('d-flex')
    likeBox.classList.add('justify-content-end')
    let like = document.createElement('button') //5
    like.classList.add('btn')
    let likeIcon = document.createElement('i') //5
    likeIcon.classList.add('bi')
    likeIcon.classList.add('bi-heart')
    like.appendChild(likeIcon)
    likeBox.appendChild(like)

    likeBox.addEventListener('click', (e)=>{
        alert('I like it ' + data.title)
        e.stopPropagation()
    })

    textBody.appendChild(likeBox)
    boxBody.appendChild(textBody)
    box.appendChild(boxBody)

    box.addEventListener('click', ()=>{
        window.open(data.url, '_blank').focus();
    })

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
    let outerBox = document.createElement('div')
    outerBox.classList.add('col')

    let box = document.createElement('div')
    box.classList.add('card')
    box.classList.add('text-center')
    box.classList.add('py-5')  
    
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
    outerBox.appendChild(box)

    box.addEventListener('click', () => {
        console.log(genre.name)
        //getAllAnimeByGenre()
    })

    genreGroup.appendChild(outerBox)
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

function hideCategories() {
    document.getElementById('categories').style.display = 'none'
}
function hideHome() {
    document.getElementById('welcomeText').style.visibility = 'collapse'
    document.getElementById('welcome').classList.remove('welcome-decor')
    document.getElementById('searchBox').style.visibility = 'hidden'
}

document.getElementById('search').addEventListener('click', () => {
    hideCategories()

    let searchWord = document.getElementById('searchWord').value
    console.log(searchWord)
    document.getElementById('serchResult').innerHTML = ''
    getAnimeSearch(searchWord)
})

document.getElementById('welcome').addEventListener('click', ()=>{
    //hideHome()
    //console.log('welcome')
})

function onLoad() {
    getGenre()
}
window.addEventListener('load', onLoad)