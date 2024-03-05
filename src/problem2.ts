import axios from 'axios'
import { Validator } from 'jsonschema'
import { mlsAConfig } from './mls/mlsA'
import { mlsBConfig } from './mls/mlsB'

export interface CRMRequestBody {
  mls_name: string
  mls_id: number
  street_address: string
  city: string
  state: string
  zip_code: number
  list_price: number
  list_date: number
  bedrooms?: number
  full_baths?: number
  half_baths?: number
  size?: number
}

export interface MLSConfig {
  schema: any
  idField: string
  transorm: (v: JSON) => CRMRequestBody
}

const validator = new Validator()

const mlsConfig = [mlsAConfig, mlsBConfig]

export async function postToCrm(value: any) {
  for (const c of mlsConfig) {
    // optmization - if idField is not there we know it's not that type
    if (!value[c.idField]) continue
    if (!validator.validate(value, c.schema).valid) continue
    const { status, data } = await axios.post(
      'https://knock-crm.io/customer/762910/properties',
      c.mapper(value)
    )
    return { status, data }
  }
  throw Error('MLS data does not satisy any configured schemas.')
}
