export interface MlsA {
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

export interface MlsB {
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