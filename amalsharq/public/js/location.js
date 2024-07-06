frappe.ui.form.on("Location", {
  refresh: function (frm) {
    if (!frm.is_new()) {
      let latitude = +frm.doc.latitude;
      let longitude = +frm.doc.longitude;

      if (latitude && longitude) {
        let map = frm.fields_dict.location.map.setView(
          [latitude, longitude],
          13
        );
        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup(frm.doc.name)
          .openPopup();
      }
    }
  },
  before_save(frm) {
    frm.doc.location = "";
    let geojsonFeature = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: { type: "Point", coordinates: [+longitude, +latitude] },
        },
      ],
    };
    frm.doc.location = JSON.stringify(geojsonFeature);
  },
  latitude(frm) {
    refresh_location(frm);
  },

  longitude(frm) {
    refresh_location(frm);
  },

  location(frm) {
    let location = JSON.parse(frm.doc.location);
    let last_point = location.features.slice(-1).pop();
    let type_point = last_point.geometry.type;
    if (type_point === "Point") {
      let latlng = last_point.geometry.coordinates;
      latitude = +latlng[1];
      longitude = +latlng[0];
      frm.doc.location = "";
      frm.doc.latitude = latitude;
      frm.doc.longitude = longitude;

      frm.refresh_field("location");
      frm.refresh_field("latitude");
      frm.refresh_field("longitude");

      let map = frm.fields_dict.location.map.setView([latitude, longitude], 13);
      L.marker([latitude, longitude]).addTo(map);
    } else {
      frm.doc.location = "";
      frm.refresh_field("location");
    }
  },
});
function refresh_location(frm) {
  frm.doc.location = "";
  frm.refresh_field("location");
  latitude = +frm.doc.latitude;
  longitude = +frm.doc.longitude;
  let map = frm.fields_dict.location.map.setView([latitude, longitude], 13);
  L.marker([latitude, longitude]).addTo(map);
}
