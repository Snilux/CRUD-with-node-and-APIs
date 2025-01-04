const request = indexedDB.open("imageDatabase", 1);
let db;
let imagesSelected = [];
request.onupgradeneeded = function (event) {
  db = event.target.result;
  if (!db.objectStoreNames.contains("images")) {
    db.createObjectStore("images", { keyPath: "id", autoIncrement: true });
  }
};

request.onsuccess = function (event) {
  db = event.target.result;
  console.log("Base de datos abierta con éxito");
};

request.onerror = function (event) {
  console.error("Error al abrir la base de datos:", event.target.error);
};

document.getElementById("imageInput").addEventListener("change", (event) => {
  imagesSelected = Array.from(event.target.files);
  console.log(`${imagesSelected.length} imagenes seleccionadas`);
});

document.getElementById("loadImages").addEventListener("click", () => {
  if (imagesSelected.length === 0) {
    Swal.fire("Selecciona imagenes");
    return;
  }
  imagesSelected.forEach((image) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const dataImage = e.target.result;

      const transaction = db.transaction("images", "readwrite");
      const store = transaction.objectStore("images");

      const objectImage = { data: dataImage, name: image.name };

      store.add(objectImage);

      transaction.oncomplete = () => {
        console.log(`Imagen ${image.name} exitosa`);
      };

      transaction.onerror = (err) => {
        console.log(`Error ${err.target.error}`);
      };
    };
    reader.readAsDataURL(image);
  });

  Swal.fire("Las imagenes se han subido correctamente");
  imagesSelected = [];
});

const deleteImage = (id) => {
  const transaction = db.transaction("images", "readwrite");
  const store = transaction.objectStore("images");
  const req = store.delete(id);

  req.onsuccess = () => {
    Swal.fire("Imagen eliminada con exito");
    document.getElementById("seeImages").click();
  };
  req.onerror = (err) => {
    console.log(`Error ${err.target.error}`);
  };
};

document.getElementById("seeImages").addEventListener("click", () => {
  const transaction = db.transaction("images", "readonly");
  const store = transaction.objectStore("images");

  const req = store.getAll();
  req.onsuccess = () => {
    const images = req.result;
    if (images.length === 0) Swal.fire("No hay imagenes que mostrar");

    const gallery = document.getElementById("galleryImages");
    gallery.innerHTML = ``;

    images.forEach((image) => {
      const div = document.createElement("div");
      div.classList.add("galleryImages--card");

      const element = document.createElement("img");
      element.src = image.data;
      element.alt = image.id;
      div.appendChild(element);

      const button = document.createElement("button");
      button.textContent = "Eliminar";
      button.id = image.id;
      button.classList.add("btn", "btn-outline-danger");
      div.appendChild(button);

      gallery.appendChild(div);

      button.addEventListener("click", () => {
        deleteImage(image.id);
      });
    });
  };

  req.onerror = (err) => {
    console.log(`Error al cargar las imagenes ${err.target.error}`);
  };
});

document.getElementById("deleteAllImages").addEventListener("click", () => {
  const transaction = db.transaction("images", "readwrite");
  const store = transaction.objectStore("images");

  const req = store.clear();

  req.onsuccess = () => {
    Swal.fire("Todas las imagenes han sido eliminadas");

    document.getElementById("galleryImages").innerHTML = ``;
  };
  req.onerror = (err) => {
    Swal.fire("Error al eliminar las imagenes");
    console.log(err.target.error);
  };
});
