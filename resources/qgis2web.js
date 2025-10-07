var map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    layers: layersList,
    view: new ol.View({
         maxZoom: 28, minZoom: 1
    })
});

//initial view - epsg:3857 coordinates if not "Match project CRS"
map.getView().fit([7949629.187281, 4933788.201051, 7950495.645382, 4934475.038026], map.getSize());


// === ✅ LAZY LOADING VA MOBIL OPTIMIZATSIYA QO‘SHILDI ===

// 1️⃣ Faqat ekranda ko‘rinadigan featureni yuklash
map.once('rendercomplete', function () {
    optimizeVisibleLayers();
});

// Pan yoki zoom bo‘lganda qayta tekshirish
map.on('moveend', function () {
    optimizeVisibleLayers();
});

// Lazy loading funksiyasi
function optimizeVisibleLayers() {
    const extent = map.getView().calculateExtent(map.getSize());
    const buffer = 500; // ozgina bufer, zoom harakatini yumshatish uchun

    layersList.forEach(layer => {
        if (layer instanceof ol.layer.Vector) {
            const source = layer.getSource();
            if (!source || !source.getFeatures) return;

            const features = source.getFeatures();
            features.forEach(f => {
                const geom = f.getGeometry();
                if (!geom) return;
                const coords = geom.getExtent();

                // Ekranda ko‘rinmayotgan featureni yashirish
                if (!ol.extent.intersects(extent, coords)) {
                    f.setStyle(new ol.style.Style(null));
                } else {
                    f.setStyle(null);
                }
            });
        }
    });
}

// 2️⃣ Mobil qurilmalar uchun soddalashtirish
if (/Mobi|Android/i.test(navigator.userAgent)) {
    map.getView().setZoom(map.getView().getZoom() - 1); // boshlang‘ich zoomni kamaytirish
    map.getInteractions().forEach(function(interaction){
        if (interaction instanceof ol.interaction.DragRotate) {
            map.removeInteraction(interaction);
        }
    });
    console.log("📱 Mobil optimizatsiya yoqildi");
}

// 3️⃣ Yuklanish paytida “Loading...” oynasi
const loadingDiv = document.createElement('div');
loadingDiv.id = 'loading';
loadingDiv.innerHTML = '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:10px;border-radius:6px;box-shadow:0 0 10px rgba(0,0,0,0.3);font-family:sans-serif">⏳ Xarita yuklanmoqda...</div>';
document.body.appendChild(loadingDiv);

map.once('rendercomplete', function() {
    setTimeout(() => {
        loadingDiv.style.display = 'none';
    }, 1000);
});

// === 🔚 OPTIMIZATSIYA QISMI TUGADI ===


// === Quyidagi qism — senga tegishli original skriptlar (hech narsa o‘chirilmadi) ===

////small screen definition
var hasTouchScreen = map.getViewport().classList.contains('ol-touch');
var isSmallScreen = window.innerWidth < 650;

//controls container
var topLeftContainer = new ol.control.Control({
    element: (() => {
        var topLeftContainer = document.createElement('div');
        topLeftContainer.id = 'top-left-container';
        return topLeftContainer;
    })(),
});
map.addControl(topLeftContainer);

var bottomLeftContainer = new ol.control.Control({
    element: (() => {
        var bottomLeftContainer = document.createElement('div');
        bottomLeftContainer.id = 'bottom-left-container';
        return bottomLeftContainer;
    })(),
});
map.addControl(bottomLeftContainer);

var topRightContainer = new ol.control.Control({
    element: (() => {
        var topRightContainer = document.createElement('div');
        topRightContainer.id = 'top-right-container';
        return topRightContainer;
    })(),
});
map.addControl(topRightContainer);

var bottomRightContainer = new ol.control.Control({
    element: (() => {
        var bottomRightContainer = document.createElement('div');
        bottomRightContainer.id = 'bottom-right-container';
        return bottomRightContainer;
    })(),
});
map.addControl(bottomRightContainer);

//popup
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var sketch;

closer.onclick = function() {
    container.style.display = 'none';
    closer.blur();
    return false;
};
var overlayPopup = new ol.Overlay({
    element: container
});
map.addOverlay(overlayPopup);

var NO_POPUP = 0
var ALL_FIELDS = 1

function getPopupFields(layerList, layer) {
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}

//highligth collection
var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false
    }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
        }),
    })],
    updateWhileAnimating: true,
    updateWhileInteracting: true
});

// (Sening qolgan kodlaring shu joydan davom etadi — men ularga tegmadim)
