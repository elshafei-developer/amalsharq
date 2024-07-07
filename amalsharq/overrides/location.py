from erpnext.assets.doctype.location.location import Location
import json
import frappe
from frappe import _
class CustomLocation(Location):
    def before_insert(self):
        location_dict = json.loads(self.location)
        type_point = location_dict['features'][-1]['geometry']['type']
        if type_point != "Point":
            frappe.throw(_("ERROR Only points of 'point' type are accepted"))
