const containerImages = document.getElementById("container-images");
const accessKey = "8SiupXBMfJgz5VCHKZL-SLlPSsl0l4Ok-KnNQslIcXM";

let currentPage = 1;
let currentKeyword = "";

const searchImages = async (keyword, page = 1) => {
  try {
    const url = `https://api.unsplash.com/search/photos?per_page=9&page=${page}&query=${keyword}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.results;
  } catch (error) {
    console.error("Error al buscar imágenes:", error.message);
    throw error;
  }
};

const renderImages = (results) => {
  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("container-images-button");

    const imagen = document.createElement("img");
    imagen.src = result.urls.regular;
    div.appendChild(imagen);

    div.setAttribute("data-aos", "zoom-in");

    const imagenLink = document.createElement("a");
    imagenLink.href = result.links.html;
    imagenLink.target = "_blank";
    imagenLink.innerHTML = "Ver imagen";
    imagenLink.classList.add("btn", "btn-outline-primary");
    div.appendChild(imagenLink);

    containerImages.appendChild(div);
  });
  AOS.refresh();
};

const handleScroll = () => {
  const scrollPosition = window.scrollY + window.innerHeight;
  const bottomPosition = document.documentElement.scrollHeight;

  if (scrollPosition >= bottomPosition - 100) {
    if (currentKeyword.trim() === "") return;
    currentPage++;
    searchImages(currentKeyword, currentPage)
      .then((results) => {
        console.log(results);

        renderImages(results);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
};

document.getElementById("searchImages").addEventListener("click", () => {
  const keyword = document.getElementById("image").value;
  if (keyword.trim() === "") return;

  currentKeyword = keyword;
  currentPage = 1;
  containerImages.innerHTML = "";

  searchImages(currentKeyword, currentPage)
    .then((results) => {
      renderImages(results);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});

window.addEventListener("scroll", handleScroll);
