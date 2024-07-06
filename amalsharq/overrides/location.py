from erpnext.assets.doctype.location.location import Location
import json
import frappe
class CustomLocation(Location):
    def before_insert(self):
        location_dic = json.loads(self.location)
        type_point = location_dic['features'][-1]['geometry']['type']
        if type_point != "Point":
            frappe.throw(_("ERROR Only points of 'point' type are accepted"))
