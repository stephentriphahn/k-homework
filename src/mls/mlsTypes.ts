/**
 * These interfaces are used to generate JSON schemas for example:
 * ./node_modules/.bin/typescript-json-schema ./src/mlsTypes.ts GaFmls
 * That prints the schema to stdout, so I just copied that into the config files
 * Ideally, this would be handled more elegantly in a script
 */


export interface GaFmls {
  data_name: string
  vendor_id: string
  address_components: {
    address: string
    street_name: string
    street_number: string
    street_suffix: string
    city: string
    state: string
    zipcode: string
  }
  list: string
  date: string
  property: {
    bed_count: string
    bath_count: string
    half_bath_count: string
    square_feet: string
  }
}

export interface NcscCmls {
  name: string
  id: string
  geo: {
    address: string
    city: string
    state: string
    zip: string
  }
  listing: {
    price: string
    bedrooms: string
    bathrooms: string
    square_feet: string
  }
  created: string
}

