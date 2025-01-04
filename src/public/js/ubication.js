var map;
const getCoords = () => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const coordinates = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          resolve(coordinates);
        },
        function (error) {
          reject("Error al obtener la ubicación: " + error.message);
        }
      );
    } else {
      reject("Geolocalización no soportada");
    }
  });
};

const drawMap = (lat, lon) => {
  if (map) {
    map.remove();
  }

  map = L.map("map").setView([lat, lon], 17);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "fackin J",
  }).addTo(map);
  L.marker([lat, lon])
    .addTo(map)
    .bindPopup(`Tu ubicación: \nLat: ${lat} \nLon: ${lon}`);

  function onMapClick(e) {
    L.marker(e.latlng).addTo(map).bindPopup(`La ubicacion es ${e.latlng}`);
  }

  map.on("click", onMapClick);
};

document.getElementById("myUbication").addEventListener("click", () => {
  document.getElementById("ocultarInput").classList.add("ocultar");
  getCoords()
    .then((coords) => {
      drawMap(coords.lat, coords.lon);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});

document.getElementById("ubication").addEventListener("click", () => {
  document.getElementById("ocultarInput").classList.remove("ocultar");
});

document.getElementById("searchUbication").addEventListener("click", () => {
  const coordinates = {
    lat: document.getElementById("latitude").value,
    lon: document.getElementById("longitude").value,
  };
  drawMap(coordinates.lat, coordinates.lon);
});
