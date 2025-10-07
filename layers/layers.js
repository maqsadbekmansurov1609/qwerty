var wms_layers = [];


        var lyr_GoogleSatelliteHybrid_0 = new ol.layer.Tile({
            'title': 'Google Satellite Hybrid',
            //'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
                crossOrigin: 'anonymous',
            })
        });
// Fallback OSM base layer (enabled if Google fails)
var lyr_OSM_Fallback = new ol.layer.Tile({
    title: 'OpenStreetMap (fallback)',
    opacity: 1,
    visible: false,
    source: new ol.source.OSM({
        crossOrigin: 'anonymous'
    })
});

// Detect Google XYZ errors and switch to OSM
if (lyr_GoogleSatelliteHybrid_0 && lyr_GoogleSatelliteHybrid_0.getSource()) {
    var gSrc = lyr_GoogleSatelliteHybrid_0.getSource();
    gSrc.on('tileloaderror', function() {
        console.warn('Google tiles failed. Switching to OSM fallback.');
        lyr_GoogleSatelliteHybrid_0.setVisible(false);
        lyr_OSM_Fallback.setVisible(true);
    });
}
var format___1 = new ol.format.GeoJSON();
var features___1 = format___1.readFeatures(json___1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource___1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource___1.addFeatures(features___1);
var lyr___1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource___1, 
                style: style___1,
                popuplayertitle: "массив_чегара",
                interactive: true,
                title: '<img src="styles/legend/__1.png" /> массив_чегара'
            });
var format_22_2 = new ol.format.GeoJSON();
var features_22_2 = format_22_2.readFeatures(json_22_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_22_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_22_2.addFeatures(features_22_2);
var lyr_22_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_22_2, 
                style: style_22_2,
                popuplayertitle: "22",
                interactive: true,
                title: '<img src="styles/legend/22_2.png" /> 22'
            });
var format_21072025_3 = new ol.format.GeoJSON();
var features_21072025_3 = format_21072025_3.readFeatures(json_21072025_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_21072025_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_21072025_3.addFeatures(features_21072025_3);
var lyr_21072025_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_21072025_3, 
                style: style_21072025_3,
                popuplayertitle: "Узкад 21.07.2025 шейп",
                interactive: true,
                title: '<img src="styles/legend/21072025_3.png" /> Узкад 21.07.2025 шейп'
            });

lyr_GoogleSatelliteHybrid_0.setVisible(true);lyr_OSM_Fallback.setVisible(false);lyr___1.setVisible(true);lyr_22_2.setVisible(true);lyr_21072025_3.setVisible(true);
var layersList = [lyr_GoogleSatelliteHybrid_0,lyr_OSM_Fallback,lyr___1,lyr_22_2,lyr_21072025_3];
lyr___1.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'name': 'name', 'name_lot': 'name_lot', 'tuman': 'tuman', 'viloyat': 'viloyat', 'dis': 'dis', 'area': 'area', 'length': 'length', 'district_i': 'district_i', 'MFY': 'MFY', 'massiv_id': 'massiv_id', 'SHAPE_Leng': 'SHAPE_Leng', 'SHAPE_Area': 'SHAPE_Area', });
lyr_22_2.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'ParcelID': 'ParcelID', 'CropType': 'CropType', 'CropArea': 'CropArea', 'Massiv': 'Massiv', 'District': 'District', 'Region': 'Region', 'Date_': 'Date_', 'SHAPE_Leng': 'SHAPE_Leng', 'SHAPE_Area': 'SHAPE_Area', });
lyr_21072025_3.set('fieldAliases', {'tax_number': 'tax_number', 'full_name': 'full_name', });
lyr___1.set('fieldImages', {'OBJECTID': 'TextEdit', 'name': 'TextEdit', 'name_lot': 'TextEdit', 'tuman': 'TextEdit', 'viloyat': 'TextEdit', 'dis': 'TextEdit', 'area': 'TextEdit', 'length': 'TextEdit', 'district_i': 'TextEdit', 'MFY': 'TextEdit', 'massiv_id': 'TextEdit', 'SHAPE_Leng': 'TextEdit', 'SHAPE_Area': 'TextEdit', });
lyr_22_2.set('fieldImages', {'OBJECTID': 'TextEdit', 'ParcelID': 'TextEdit', 'CropType': 'TextEdit', 'CropArea': 'TextEdit', 'Massiv': 'TextEdit', 'District': 'TextEdit', 'Region': 'TextEdit', 'Date_': 'TextEdit', 'SHAPE_Leng': 'TextEdit', 'SHAPE_Area': 'TextEdit', });
lyr_21072025_3.set('fieldImages', {'tax_number': 'TextEdit', 'full_name': 'TextEdit', });
lyr___1.set('fieldLabels', {'OBJECTID': 'no label', 'name': 'no label', 'name_lot': 'no label', 'tuman': 'no label', 'viloyat': 'no label', 'dis': 'no label', 'area': 'no label', 'length': 'no label', 'district_i': 'no label', 'MFY': 'no label', 'massiv_id': 'no label', 'SHAPE_Leng': 'no label', 'SHAPE_Area': 'no label', });
lyr_22_2.set('fieldLabels', {'OBJECTID': 'no label', 'ParcelID': 'no label', 'CropType': 'no label', 'CropArea': 'no label', 'Massiv': 'no label', 'District': 'no label', 'Region': 'no label', 'Date_': 'no label', 'SHAPE_Leng': 'no label', 'SHAPE_Area': 'no label', });
lyr_21072025_3.set('fieldLabels', {'tax_number': 'no label', 'full_name': 'no label', });
lyr_21072025_3.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});