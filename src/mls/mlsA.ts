import { CRMRequestBody } from "../problem2"

export const mlsA: any = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "properties": {
        "address_components": {
            "properties": {
                "address": {
                    "type": "string"
                },
                "city": {
                    "type": "string"
                },
                "state": {
                    "type": "string"
                },
                "street_name": {
                    "type": "string"
                },
                "street_number": {
                    "type": "string"
                },
                "street_suffix": {
                    "type": "string"
                },
                "zipcode": {
                    "type": "string"
                }
            },
            "required": [
                "address",
                "city",
                "state",
                "street_name",
                "street_number",
                "street_suffix",
                "zipcode"
            ],
            "type": "object"
        },
        "data_name": {
            "type": "string"
        },
        "date": {
            "type": "string"
        },
        "list": {
            "type": "string"
        },
        "property": {
            "properties": {
                "bath_count": {
                    "type": "string"
                },
                "bed_count": {
                    "type": "string"
                },
                "half_bath_count": {
                    "type": "string"
                },
                "square_feet": {
                    "type": "string"
                }
            },
            "required": [
                "bath_count",
                "bed_count",
                "half_bath_count",
                "square_feet"
            ],
            "type": "object"
        },
        "vendor_id": {
            "type": "string"
        }
    },
    "required": [
        "address_components",
        "data_name",
        "date",
        "list",
        "property",
        "vendor_id"
    ],
    "type": "object"
}



export function mlsAMapper(mls: any): CRMRequestBody {
    const addr_comp = mls.address_components
    return {
        mls_name: mls.data_name,
        mls_id: mls.vendor_id,
        street_address: `${addr_comp.street_number} ${addr_comp.street_name} ${addr_comp.street_suffix}`,
        city: addr_comp.city,
        state: addr_comp.state,
        zip_code: parseInt(addr_comp.zipcode),
        list_price: parseInt(mls.list.replace(/[^0-9.-]+/g, '')),
        list_date: new Date(mls.date).getTime(),
        bedrooms: parseInt(mls.property.bed_count),
        full_baths: parseInt(mls.property.bath_count),
        half_baths: parseInt(mls.property.half_bath_count),
        size: parseInt(mls.property.square_feet)
    }
}

export const mlsAConfig = {
    schema: mlsA,
    mapper: mlsAMapper,
    idField: 'vendor_id'
}