import {
    createApi
} from "unsplash-js";
import './css/main.css';

const api = createApi({
    accessKey: process.env.UNSPLASH_ACCESS_KEY
});

// Get image container

const imageContainer = document.querySelector('.photohub-content');


const url = 'https://api.unsplash.com/photos?page=1'


api.photos.list(url).then(result => {
  if (result.type === 'success') {
      const photos = result.response;
      
      photos.results.map((photo) => {
          const image = document.createElement('figure');
          image.classList.add('img-reponsive');
          image.innerHTML = `<img src="${photo.urls.thumb}"/>`;

          imageContainer.appendChild(image);
      })
    // unsplash.photos.trackDownload({
    //   downloadLocation: photo.links.download_location,
    // });
  }
});




