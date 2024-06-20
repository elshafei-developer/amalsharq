frappe.ui.form.on("Location", {
  refresh: function (frm) {
    if (!frm.is_new()) {
      if (frm.doc.latitude && frm.doc.longitude) {
        let map = frm.fields_dict.location.map;
        L.marker([frm.doc.latitude, frm.doc.longitude])
          .addTo(map)
          .bindPopup(frm.doc.name)
          .openPopup();
      }
    }
  },
  latitude(frm) {
    let map = frm.fields_dict.location.map.setView(
      [+frm.doc.latitude, +frm.doc.longitude],
      13
    );
    L.marker([+frm.doc.latitude, +frm.doc.longitude]).addTo(map);
  },

  longitude(frm) {
    let map = frm.fields_dict.location.map.setView(
      [+frm.doc.latitude, +frm.doc.longitude],
      13
    );
    L.marker([+frm.doc.latitude, +frm.doc.longitude]).addTo(map);
  },

  location(frm) {
    frm.doc.latitude = +frm.fields_dict.location.map.getCenter()["lat"];
    frm.doc.longitude = +frm.fields_dict.location.map.getCenter()["lng"];
    frm.refresh_field("latitude");
    frm.refresh_field("longitude");
  },
});
