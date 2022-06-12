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
    boxBody.classList.add('card', 'h-100')
    box.appendChild(boxBody)
   
    let image = document.createElement('img') //3
    image.classList.add('card-img-top')
    image.setAttribute('src', data.images.jpg.image_url)
    boxBody.appendChild(image)

    let textBody = document.createElement('div') //3
    textBody.classList.add('card-body', 'd-flex', 'row', 'align-content-between')

    let text = document.createElement('p') //4
    text.classList.add('card-text')
    text.innerText = data.title
    textBody.appendChild(text)

    let likeBox = document.createElement('div') //4
    likeBox.classList.add('d-flex', 'justify-content-end')
    let like = document.createElement('button') //5
    like.classList.add('btn')
    let likeIcon = document.createElement('i') //5
    likeIcon.classList.add('bi', 'bi-heart') //heart
    //likeIcon.classList.add('bi', 'bi-heart-fill') //heart-fill
    likeIcon.classList.add('text-danger') //heart-fill


    like.appendChild(likeIcon)
    likeBox.appendChild(like)

    like.addEventListener('click', (e)=>{
        alert('I like it ' + data.title)
        e.stopPropagation()
    })

    textBody.appendChild(likeBox)
    boxBody.appendChild(textBody)
    box.appendChild(boxBody)

    
    //isSingleClick: Boolean = true;     
    box.addEventListener('click', ()=>{
        this.isSingleClick = true;
        setTimeout(()=>{
            if(this.isSingleClick){
                window.open(data.url, '_blank').focus();
            }
        },250)
    })
    box.addEventListener('dblclick', ()=>{
        this.isSingleClick = false;
        //alert('are you sure you like this?')
        let cf = confirm(`Add '${data.title}' to favourite list ?`)
        if(cf) {
            likeClicked(data)
        }
        
    })
    
    searchResult.appendChild(box)
}

function likeClicked(data) { //click to post
    let anime = {}
    anime.id = "316"
    anime.movie = {
        'url' : data.url,
        'image_url' : data.images.jpg.image_url,
        'title' : data.title,
        'synopsis' : data.synopsis,
        'type' : data.type,
        'episodes' : data.episodes,
        'score' : data.score,
        'rated' : data.rating
    }
    
    //console.log(anime)
    postLikeAnime(anime)
}
function postLikeAnime(anime) { //post liked anime
    fetch('https://se104-project-backend.du.r.appspot.com/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(anime)
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log('post success', data)
        //hideSearch()
        showLike()
    })
}
function deleteLikeAnime(user_id, mov_id) {
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=${user_id}&&movieId=${mov_id}`, {
        method: 'DELETE'
    }).then(response => {
        if(response.ok) {
            return response.json()
        } else {
            throw Error(response.statusText)
        }
    }).then(data => {
        alert(`Delete '${data.title}' sucess`)
        showLike()
    }).catch(error => {
        alert('Oh on! Something went wrong!', error)
    })
}

function addLike(anime) {
    const favList = document.getElementById('favList')
    
    let col = document.createElement('div')
    col.classList.add('col')

    let card = document.createElement('div')
    card.classList.add('card')

    let cardRow = document.createElement('div')
    cardRow.classList.add('row', 'g-0')
    
    let imgBox =  document.createElement('div')
    imgBox.classList.add('col-12', 'col-sm-6', 'col-md-4', 'text-center', 'text-sm-start')
    let img =  document.createElement('img')
    img.classList.add('img-fluid', 'rounded-start')
    img.setAttribute('src', anime.image_url)
    img.setAttribute('style', 'max-height: 15rem')
    imgBox.appendChild(img)

    let cardBodyBox = document.createElement('div')
    cardBodyBox.classList.add('col-12', 'col-sm-6', 'col-md-8')

    let cardBody = document.createElement('div')
    cardBody.classList.add('card-body')

    let title = document.createElement('h6')
    title.classList.add('card-title')
    title.innerText = anime.title

    let firstInfo = document.createElement('div')
    firstInfo.classList.add('d-flex', 'col', 'card-text')
    let rate = document.createElement('p')
    rate.innerText = anime.rated
    let score = document.createElement('p')
    score.classList.add('border', 'border-info', 'px-1', 'rounded', 'ms-2', 'text-center')
    score.innerHTML = `<b>score</b> ${anime.score}`
    firstInfo.append(rate, score)

    let secondInfo = document.createElement('div')
    let likeBut = document.createElement('button')
    likeBut.classList.add('btn', 'border-danger', 'me-3')
    let likeIcon = document.createElement('i')
    likeIcon.classList.add('bi', 'bi-heart-fill', 'text-danger')
    likeBut.appendChild(likeIcon)

    likeBut.addEventListener('click', ()=> {
        let cf = confirm(`Delete '${anime.title}' from favorite list ?`)
        if(cf) {
            deleteLikeAnime(316, anime.id)
        }
    })

    let detailBut = document.createElement('button')
    detailBut.classList.add('btn', 'btn-warning')
    detailBut.innerText = 'More details'
    secondInfo.append(likeBut, detailBut)

    cardBody.append(title, firstInfo, secondInfo)
    cardBodyBox.appendChild(cardBody)
    cardRow.append(imgBox, cardBodyBox)
    card.appendChild(cardRow)
    col.appendChild(card)
    favList.appendChild(col)
}
function showLike() {
    hideAll()
    showFavorite()
    document.getElementById('favList').innerHTML = ''

    fetch(`https://se104-project-backend.du.r.appspot.com/movies/316`)
    .then(response => {
        return response.json()
    }) 
    .then(data => {
        console.log('get favorite success', data)
        for(let anime of data) {
            addLike(anime)
        }
    })
}


function getGenre() {  //get all anime genre
    fetch('https://api.jikan.moe/v4/genres/anime')
    .then(response => {
        return response.json()
    }) 
    .then(data => {
        //console.log('success', data)
        getGenreEach(data.data)
    })
}
function getGenreEach(data) { //display genre each box
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
    //console.log(genres)
    for(each of genres) {
        addGenre(each) //hide cat for temporary
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


function clickSearch(search) {
    hideHome()
    showSearch()

    let searchWord = document.getElementById(search).value
    console.log(searchWord)
    document.getElementById('serchResult').innerHTML = ''
    document.getElementById('keyword').innerHTML = '"' +searchWord +'"'
    getAnimeSearch(searchWord)

    document.getElementById('searchWord').value = searchWord
}
document.getElementById('search').addEventListener('click', () => {
    clickSearch('searchWordHome')
})
document.getElementById('search-addon').addEventListener('click', () => {
    clickSearch('searchWord')
})

function hideHome() {
    document.getElementById('welcome').classList.remove('welcome-decor')
    document.getElementById('welcomeText').style.display = 'none'
    document.getElementById('searchBox').style.visibility = 'hidden'
    document.getElementById('categories').style.display = 'none'
}
function showHome() {
    hideSearch()

    document.getElementById('welcome').classList.add('welcome-decor')
    document.getElementById('welcomeText').style.display = 'block'
    document.getElementById('searchBox').style.visibility = 'visible'

    document.getElementById('categories').style.display = 'block'

    //reset value
    document.getElementById('searchWord').value = ''
    document.getElementById('searchWordHome').value = ''
}
document.getElementById('home').addEventListener('click', showHome)

function hideSearch() {
    document.getElementById('displaySearchResult').style.display = 'none'
}
function showSearch(){
    document.getElementById('displaySearchResult').style.display = 'block'
}

function hideFavorite() {
    document.getElementById('favList').style.display = 'none'
}
function showFavorite(){
    document.getElementById('favList').style.display = 'flex'
}
document.getElementById('favoritePage').addEventListener('click', ()=>{
    console.log('like click')
    showLike()
})

function hideAll() {
    hideHome()
    hideSearch()
    hideFavorite()
}

function onLoad() {
    hideAll()
    getGenre()
    showHome()
}
window.addEventListener('load', onLoad)