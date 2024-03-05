import { CRMRequestBody } from "../problem2"

export const mlsB: any = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "properties": {
        "created": {
            "type": "string"
        },
        "geo": {
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
                "zip": {
                    "type": "string"
                }
            },
            "required": [
                "address",
                "city",
                "state",
                "zip"
            ],
            "type": "object"
        },
        "id": {
            "type": "string"
        },
        "listing": {
            "properties": {
                "bathrooms": {
                    "type": "string"
                },
                "bedrooms": {
                    "type": "string"
                },
                "price": {
                    "type": "string"
                },
                "square_feet": {
                    "type": "string"
                }
            },
            "required": [
                "bathrooms",
                "bedrooms",
                "price",
                "square_feet"
            ],
            "type": "object"
        },
        "name": {
            "type": "string"
        }
    },
    "required": [
        "created",
        "geo",
        "id",
        "listing",
        "name"
    ],
    "type": "object"
}

export function mlsBMapper(mls: any): CRMRequestBody {
    return {
        mls_name: mls.name,
        mls_id: mls.id,
        street_address: mls.geo.address,
        city: mls.geo.city,
        state: mls.geo.state,
        zip_code: parseInt(mls.geo.zip),
        list_price: parseInt(mls.listing.price.replace(/[^0-9.-]+/g, '')),
        list_date: new Date(mls.created).getTime(),
        bedrooms: parseInt(mls.listing.bedrooms),
        full_baths: parseInt(mls.listing.bathrooms),
        size: parseInt(mls.listing.square_feet),
    }
}

export const mlsBConfig = {
    schema: mlsB,
    mapper: mlsBMapper,
    idField: 'id'
}