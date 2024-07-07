frappe.ui.form.on("Location", {
  refresh: function (frm) {
    const classesToRemove = [
      "leaflet-draw-draw-polyline",
      "leaflet-draw-draw-polygon",
      "leaflet-draw-draw-rectangle",
      "leaflet-draw-draw-circle",
      "leaflet-draw-draw-circlemarker",
    ];

    for (let i = 0; i < classesToRemove.length; i++) {
      const elementToRemove = document.querySelector(`a.${classesToRemove[i]}`);
      if (elementToRemove) {
        elementToRemove.remove();
      }
    }
    if (!frm.is_new()) {
    }
  },
  before_save(frm) {
    let location = JSON.parse(frm.doc.location);
    let last_point = location.features.slice(-1).pop();
    let type_point = last_point.geometry.type;
    if (type_point === "Point") {
      let latlng = last_point.geometry.coordinates;
      latitude = +latlng[1];
      longitude = +latlng[0];
    } else {
      latitude = +frm.doc.latitude;
      longitude = +frm.doc.longitude;
    }
    frm.doc.location = "";
    let geojsonFeature = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: { type: "Point", coordinates: [longitude, latitude] },
        },
      ],
    };
    frm.doc.location = JSON.stringify(geojsonFeature);
    frm.refresh();
  },
  latitude(frm) {
    refresh_location(frm);
  },

  longitude(frm) {
    refresh_location(frm);
  },

  location(frm) {
    let center = frm.fields_dict.location.map.getCenter();
    frm.set_value("latitude", center.lat);
    frm.set_value("longitude", center.lng);
    frm.refresh();
  },
});
function refresh_location(frm) {
  latitude = +frm.doc.latitude;
  longitude = +frm.doc.longitude;
  let map = frm.fields_dict.location.map.setView([latitude, longitude], 13);
  L.marker([latitude, longitude]).addTo(map);
}
