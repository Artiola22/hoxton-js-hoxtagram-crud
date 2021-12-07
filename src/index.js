// write your code here


const imageContainerEl = document.querySelector('.image-container')

const state = {
    images: []
}

// SERVER FUNCTIONS

// getImages :: () => Promise<images>
function getImages() {
    return fetch('http://localhost:3000/images').then(resp => resp.json()) // Promise<images>
}

// createCommentOnServer :: (imageId: number, content: string) => Promise<comment>
function createCommentOnServer(imageId, content) {
    return fetch('http://localhost:3000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imageId: imageId,
            content: content
        })
    }).then(resp => resp.json())
}

function updateLikesOnServer(image) {
    return fetch(`http://localhost:3000/images/${image.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            likes: image.likes

        })
    }).then(resp => resp.json())
}

function deleteCommentsFromServer(id) {
    fetch(`http://localhost:3000/images/${id}`, {
        method: 'DELETE'
    })
}

function deleteImagesOnServer(id) {
    fetch(`http://localhost:3000/images/${id}`, {
        method: 'DELETE'
    })
}

// RENDER FUNCTIONS
function renderImage(image) {
    const articleEl = document.createElement('article')
    articleEl.setAttribute('class', 'image-card')

    const titleEl = document.createElement('h2')
    titleEl.setAttribute('class', 'title')
    titleEl.textContent = image.title

    const imgEl = document.createElement('img')
    imgEl.setAttribute('class', 'image')
    imgEl.setAttribute('src', image.image)

    const buttonsDiv = document.createElement('div')
    buttonsDiv.setAttribute('class', 'likes-section')

    const likesEl = document.createElement('span')
    likesEl.setAttribute('class', 'likes')
    likesEl.textContent = `${image.likes} likes`

    const likeBtn = document.createElement('button')
    likeBtn.setAttribute('class', 'like-button')
    likeBtn.textContent = '♥'

    buttonsDiv.append(likesEl, likeBtn)

    const commentsList = document.createElement('ul')
    commentsList.setAttribute('class', 'comments')

    for (const comment of image.comments) {
        const commentLi = document.createElement('li')
        commentLi.textContent = comment.content
        commentsList.append(commentLi)
    }

    articleEl.append(titleEl, imgEl, buttonsDiv, commentsList)
    imageContainerEl.append(articleEl)
}

function renderImages() {
    // Destroy the images
    imageContainerEl.innerHTML = ''

    // Recreate the images
    for (const image of state.images) {
        renderImage(image)
    }
}

function render() {
    renderImages()
}

render()
getImages().then(function (images) {
    // we can guantee that this code runs:
    // - if the fetch worked
    // - when the image data is ready
    state.images = images
    render()
})