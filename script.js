const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];


// Unsplash API
const count = 10;
const apiKey = 'qE97tGg7iYImIm2tUsmjs5BON7o8HihXyhwruchCqRo';
const searchImage = 'cats';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${searchImage}`;


// Helper Funtion to set attributes on Dom elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements for links & photos, add to DOM
function displayPhotos() {
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a></a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href:photo.links.html,
            target: '_blank',
        })
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Put <img> inside <a></a> then both inside image container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}
// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        // catch error here
    }
}

// Check to see if scrolling near bottom of bage, Load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        getPhotos();
    }
})

// On Load
getPhotos();