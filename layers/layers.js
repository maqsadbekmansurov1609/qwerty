// =======================
// 🗺️ BASE LAYERS
// =======================
var googleSatellite = new ol.layer.Tile({
  title: "Google Satellite",
  type: "base",
  opacity: 1,
  visible: true,
  source: new ol.source.XYZ({
    attributions: "© Google Maps",
    url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
    crossOrigin: "anonymous",
  }),
});

var osmFallback = new ol.layer.Tile({
  title: "OpenStreetMap (fallback)",
  opacity: 1,
  visible: false,
  source: new ol.source.OSM({ crossOrigin: "anonymous" }),
});

// Google ishlamasa — fallback
googleSatellite.getSource().on("tileloaderror", function () {
  console.warn("⚠️ Google tiles failed, switching to OSM fallback.");
  googleSatellite.setVisible(false);
  osmFallback.setVisible(true);
});

// =======================
// 🧩 VECTOR LAYERS (Lazy Load)
// =======================
function createLazyLayer(geojsonData, styleFn, title) {
  return new ol.layer.Vector({
    source: new ol.source.Vector({
      format: new ol.format.GeoJSON(),
      loader: function (extent, resolution, projection) {
        // faqat ko‘rinayotgan qismni yuklaydi
        const features = new ol.format.GeoJSON().readFeatures(geojsonData, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        });
        this.addFeatures(features);
      },
      strategy: ol.loadingstrategy.bbox,
    }),
    style: styleFn,
    declutter: true,
    interactive: true,
    title: title,
  });
}

// 🔹 Layer 1
var lyr_1 = createLazyLayer(json___1, style___1, "массив_чегара");
// 🔹 Layer 2
var lyr_2 = createLazyLayer(json_22_2, style_22_2, "22");
// 🔹 Layer 3
var lyr_3 = createLazyLayer(json_21072025_3, style_21072025_3, "Узкад 21.07.2025 шейп");

// =======================
// 🧭 MAP INIT
// =======================
var map = new ol.Map({
  target: "map",
  layers: [googleSatellite, osmFallback, lyr_1, lyr_2, lyr_3],
  view: new ol.View({
    center: ol.proj.fromLonLat([71.1063, 40.4389]),
    zoom: 13,
  }),
});

// =======================
// 💬 POPUP
// =======================
var container = document.getElementById("popup");
var content = document.getElementById("popup-content");
var closer = document.getElementById("popup-closer");

var overlay = new ol.Overlay({
  element: container,
  autoPan: { animation: { duration: 250 } },
});
map.addOverlay(overlay);

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

map.on("singleclick", function (evt) {
  var feature = map.forEachFeatureAtPixel(evt.pixel, function (f) {
    return f;
  });
  if (feature) {
    const props = feature.getProperties();
    delete props.geometry;
    const info = Object.entries(props)
      .map(([k, v]) => `<strong>${k}</strong>: ${v}`)
      .join("<br>");
    content.innerHTML = info;
    overlay.setPosition(evt.coordinate);
  } else {
    overlay.setPosition(undefined);
  }
});

// =======================
// 🪶 LABEL STYLE (if needed)
// =======================
function style___1(feature) {
  return new ol.style.Style({
    stroke: new ol.style.Stroke({ color: "#007bff", width: 1 }),
    fill: new ol.style.Fill({ color: "rgba(0,123,255,0.1)" }),
    text: new ol.style.Text({
      font: "12px Calibri,sans-serif",
      fill: new ol.style.Fill({ color: "#000" }),
      stroke: new ol.style.Stroke({ color: "#fff", width: 2 }),
      text: feature.get("name_lot") || "",
    }),
  });
}
