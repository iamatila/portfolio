console.log("its working");

let theme = localStorage.getItem("theme");

if (theme == null) {
  setTheme("light");
} else {
  setTheme(theme);
}

let themeDots = document.getElementsByClassName("theme-dot");

for (var i = 0; themeDots.length > i; i++) {
  themeDots[i].addEventListener("click", function () {
    let mode = this.dataset.mode;
    console.log("clicked", mode);
    setTheme(mode);
  });
}

function setTheme(mode) {
  if (mode == "light") {
    document.getElementById("theme-style").href = "default.css";
  }

  if (mode == "blue") {
    document.getElementById("theme-style").href = "blue.css";
  }

  if (mode == "green") {
    document.getElementById("theme-style").href = "green.css";
  }

  if (mode == "purple") {
    document.getElementById("theme-style").href = "purple.css";
  }

  localStorage.setItem("theme", mode);
}

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const postsContainer = document.querySelector('.post-wrapper');
    if (!postsContainer) return;
    data.work_projects.forEach(item => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
      postDiv.style.border = '1px solid var(--borderColor)';
      postDiv.style.boxShadow = '-1px 1px 3px -1px rgba(0, 0, 0, 0.75)';

      // Build links only if present
      let links = '';
      if (item.website) {
        links += `<a href="${item.website}" target="_blank" rel="noopener noreferrer">Website</a> `;
      }
      if (item.repo) {
        links += `<a href="${item.repo}" target="_blank" rel="noopener noreferrer">Github repo</a>`;
      }

      postDiv.innerHTML = `
        <div class="thumbnail-wrap">
          <img class="thumbnail" src="${item.thumbnail}" alt="${item.title}" data-preview='${JSON.stringify(
        item.preview
      )}' />
          ${item.preview && item.preview.length ? `<button class="view-chip" data-preview='${JSON.stringify(item.preview)}'>View</button>` : ''}
        </div>
        <div class="post-preview">
          <h6 class="post-title">${item.title}</h6>
          <p class="post-intro">${item.description}</p>
          <p class="post-tech">${item.tech}</p>
          <p>${links}</p>
        </div>
      `;

      // Style image
      const imgElement = postDiv.querySelector('.thumbnail');
      imgElement.style.display = 'block';
      imgElement.style.width = '100%';
      imgElement.style.height = '180px';
      imgElement.style.objectFit = 'cover';

      // Style post-preview
      const postPreviewElement = postDiv.querySelector('.post-preview');
      postPreviewElement.style.backgroundColor = '#fff';
      postPreviewElement.style.padding = '15px';

      // Style post-title
      const postTitleElement = postDiv.querySelector('.post-title');
      postTitleElement.style.color = 'black';
      postTitleElement.style.margin = '0';

      // Style post-intro
      const postIntroElement = postDiv.querySelector('.post-intro');
      postIntroElement.style.color = '#4b5156';
      postIntroElement.style.fontSize = '14px';

      // Style post-tech
      const postTechElement = postDiv.querySelector('.post-tech');
      postTechElement.style.color = '#2f3fa5ff';
      postTechElement.style.fontSize = '14px';

      postsContainer.appendChild(postDiv);
    });
  })
  .catch(error => console.error('Error fetching the JSON data:', error));


fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const postsContainer = document.querySelector('.post-wrapper2');
    if (!postsContainer) return;
    data.side_projects.forEach(item => {
      const postDiv = document.createElement('div');
      postDiv.classList.add('post');
      postDiv.style.border = '1px solid var(--borderColor)';
      postDiv.style.boxShadow = '-1px 1px 3px -1px rgba(0, 0, 0, 0.75)';

      // Build links only if present
      let links = '';
      if (item.website) {
        links += `<a href="${item.website}" target="_blank" rel="noopener noreferrer">Website</a> `;
      }
      if (item.repo) {
        links += `<a href="${item.repo}" target="_blank" rel="noopener noreferrer">Github repo</a>`;
      }

      postDiv.innerHTML = `
        <div class="thumbnail-wrap">
          <img class="thumbnail" src="${item.thumbnail}" alt="${item.title}" data-preview='${JSON.stringify(item.preview)}' />
          ${item.preview && item.preview.length ? `<button class="view-chip" data-preview='${JSON.stringify(item.preview)}'>View</button>` : ''}
        </div>
        <div class="post-preview">
          <h6 class="post-title">${item.title}</h6>
          <p class="post-intro">${item.description}</p>
          <p class="post-tech">${item.tech}</p>
          <p>${links}</p>
        </div>
      `;
      

      // Style image
      const imgElement = postDiv.querySelector('.thumbnail');
      imgElement.style.display = 'block';
      imgElement.style.width = '100%';
      imgElement.style.height = '180px';
      imgElement.style.objectFit = 'cover';

      // Style post-preview
      const postPreviewElement = postDiv.querySelector('.post-preview');
      postPreviewElement.style.backgroundColor = '#fff';
      postPreviewElement.style.padding = '15px';

      // Style post-title
      const postTitleElement = postDiv.querySelector('.post-title');
      postTitleElement.style.color = 'black';
      postTitleElement.style.margin = '0';

      // Style post-intro
      const postIntroElement = postDiv.querySelector('.post-intro');
      postIntroElement.style.color = '#4b5156';
      postIntroElement.style.fontSize = '14px';

      // Style post-tech
      const postTechElement = postDiv.querySelector('.post-tech');
      postTechElement.style.color = '#2f3fa5ff';
      postTechElement.style.fontSize = '14px';

      postsContainer.appendChild(postDiv);
    });
  })
  .catch(error => console.error('Error fetching the JSON data:', error));


// --- Modal / Carousel ---
// Create modal HTML once
const modalHtml = `
  <div id="preview-modal" class="preview-modal" aria-hidden="true" style="display:none;">
    <div class="preview-backdrop"></div>
    <div class="preview-dialog" role="dialog" aria-modal="true">
      <button class="preview-close" aria-label="Close preview">✕</button>
      <div class="preview-carousel">
        <button class="carousel-prev" aria-label="Previous">‹</button>
        <div class="carousel-track"></div>
        <button class="carousel-next" aria-label="Next">›</button>
      </div>
    </div>
  </div>
`;
document.body.insertAdjacentHTML('beforeend', modalHtml);

const previewModal = document.getElementById('preview-modal');
const carouselTrack = previewModal.querySelector('.carousel-track');
const btnClose = previewModal.querySelector('.preview-close');
const btnPrev = previewModal.querySelector('.carousel-prev');
const btnNext = previewModal.querySelector('.carousel-next');
const backdrop = previewModal.querySelector('.preview-backdrop');

let currentIndex = 0;
let currentMediaElements = [];

function openPreview(previewItems, startIndex = 0) {
  // Clear existing
  carouselTrack.innerHTML = '';
  currentMediaElements = [];

  // Build slides
  previewItems.forEach((url, idx) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.dataset.index = idx;
    // naive mime check by extension
    const lower = url.toLowerCase();
    if (lower.match(/\.(mp4|webm|ogg)(\?|$)/)) {
      const video = document.createElement('video');
      video.src = url;
      video.controls = true;
      video.preload = 'metadata';
      video.style.maxWidth = '100%';
      video.style.maxHeight = '70vh';
      slide.appendChild(video);
      currentMediaElements.push(video);
    } else {
      const img = document.createElement('img');
      img.src = url;
      img.alt = `Preview ${idx + 1}`;
      img.style.maxWidth = '100%';
      img.style.maxHeight = '70vh';
      slide.appendChild(img);
      currentMediaElements.push(img);
    }
    carouselTrack.appendChild(slide);
  });

  // thumbnail strip
  let thumbsWrap = previewModal.querySelector('.modal-thumbs');
  if (!thumbsWrap) {
    thumbsWrap = document.createElement('div');
    thumbsWrap.className = 'modal-thumbs';
    previewModal.querySelector('.preview-dialog').appendChild(thumbsWrap);
  }
  thumbsWrap.innerHTML = '';
  previewItems.forEach((url, idx) => {
    const t = document.createElement('img');
    t.className = 'modal-thumb';
    t.dataset.index = idx;
    t.src = url;
    t.alt = `thumb-${idx}`;
    t.addEventListener('click', () => { currentIndex = idx; updateCarousel(); });
    thumbsWrap.appendChild(t);
  });

  // show modal
  previewModal.style.display = 'block';
  previewModal.setAttribute('aria-hidden', 'false');
  currentIndex = startIndex;
  updateCarousel();
  document.body.style.overflow = 'hidden';
}

function closePreview() {
  // pause any playing video
  currentMediaElements.forEach(el => {
    if (el.tagName === 'VIDEO') {
      try { el.pause(); el.currentTime = 0; } catch (e) {}
    }
  });
  previewModal.style.display = 'none';
  previewModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateCarousel() {
  const slides = carouselTrack.querySelectorAll('.carousel-slide');
  slides.forEach(s => {
    const idx = Number(s.dataset.index);
    if (idx === currentIndex) {
      s.style.display = 'block';
    } else {
      s.style.display = 'none';
    }
  });

  // Pause all videos except current
  currentMediaElements.forEach((el, i) => {
    if (el.tagName === 'VIDEO') {
      if (i === currentIndex) {
        el.play().catch(() => {});
      } else {
        try { el.pause(); el.currentTime = 0; } catch (e) {}
      }
    }
  });

  // update active thumb
  const thumbs = previewModal.querySelectorAll('.modal-thumb');
  thumbs.forEach(t => t.classList.toggle('active', Number(t.dataset.index) === currentIndex));
}

btnClose.addEventListener('click', closePreview);
backdrop.addEventListener('click', closePreview);
btnPrev.addEventListener('click', () => {
  const slides = carouselTrack.querySelectorAll('.carousel-slide');
  currentIndex = (currentIndex - 1 + slides.length) % slides.length; // wrap
  updateCarousel();
});
btnNext.addEventListener('click', () => {
  const slides = carouselTrack.querySelectorAll('.carousel-slide');
  currentIndex = (currentIndex + 1) % slides.length; // wrap
  updateCarousel();
});

document.addEventListener('keydown', (e) => {
  if (previewModal.getAttribute('aria-hidden') === 'true') return;
  if (e.key === 'Escape') closePreview();
  if (e.key === 'ArrowLeft') {
    currentIndex = Math.max(0, currentIndex - 1); updateCarousel();
  }
  if (e.key === 'ArrowRight') {
    const slides = carouselTrack.querySelectorAll('.carousel-slide');
    currentIndex = Math.min(slides.length - 1, currentIndex + 1); updateCarousel();
  }
});

// Delegate thumbnail clicks to open modal (works for dynamically created thumbnails)
document.body.addEventListener('click', (e) => {
  const t = e.target.closest('.thumbnail, .view-chip');
  if (!t) return;
  const previewData = t.dataset.preview;
  if (!previewData) return;
  let previewItems = [];
  try { previewItems = JSON.parse(previewData); } catch (err) {
    // if preview is a single string, treat as single item
    previewItems = [previewData];
  }
  openPreview(previewItems, 0);
});

