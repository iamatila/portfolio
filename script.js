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
    data.post.forEach(item => {
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
        <img class="thumbnail" src="${item.thumbnail}" alt="${item.title}" />
        <div class="post-preview">
          <h6 class="post-title">${item.title}</h6>
          <p class="post-intro">${item.description}<br />${item.tech}</p>
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

      postsContainer.appendChild(postDiv);
    });
  })
  .catch(error => console.error('Error fetching the JSON data:', error));
