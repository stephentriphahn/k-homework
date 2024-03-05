import nock from 'nock'
import * as chai from 'chai'
import { postToCrm } from '../src/problem2'

const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect

chai.use(chaiAsPromised)

const mlsA = {
  data_name: 'ga_fmls',
  vendor_id: '76257',
  address_components: {
    address: '176 Milton Ave, Atlanta, GA 30317',
    street_name: 'Milton',
    street_number: '176',
    street_suffix: 'Ave',
    city: 'Atlanta',
    state: 'GA',
    zipcode: '30317',
  },
  list: '$275,000',
  date: '2018-05-02T04:19:27-04:00',
  property: {
    bed_count: '3',
    bath_count: '2',
    half_bath_count: '1',
    square_feet: '2300',
  },
}

const mlsB = {
  name: 'ncsc_cmls',
  id: '53728',
  geo: {
    address: '256 Old Mill',
    city: 'Charlotte',
    state: 'NC',
    zip: '28269',
  },
  listing: {
    price: '299,999.00',
    bedrooms: '4',
    bathrooms: '3',
    square_feet: '1975',
  },
  created: '2018-05-14 03:00:00 EST',
}

describe('postToCrm', () => {
  it('successfully POSTs a valid MlsA input', async () => {
    nock('https://knock-crm.io')
      .post('/customer/762910/properties')
      .reply(200, { success: true })

    const r = await postToCrm(mlsA)
    expect(r.status).to.eql(200)
    expect(r.data).to.eql({ success: true })
  })

  it('successfully POSTs a valid MlsB input', async () => {
    nock('https://knock-crm.io')
      .post('/customer/762910/properties')
      .reply(200, { success: true })

    const r = await postToCrm(mlsB)
    expect(r.status).to.eql(200)
    expect(r.data).to.eql({ success: true })
  })

  it('rejects an invalid Mls input', async () => {
    const r = postToCrm({ invalidId: 'foo' })
    await expect(r).to.eventually.be.rejectedWith(
      /MLS data does not satisy any configured schemas/
    )
  })

  it('rejects an invalid Mls input', async () => {
    // value is very close to being valid, but typo in vendor_id
    const value = { ...mlsA, vendor_id: undefined, vndr_id: mlsA.vendor_id }
    const r = postToCrm(value)
    await expect(r).to.eventually.be.rejectedWith(
      /MLS data does not satisy any configured schemas/
    )
  })

  it('rejects if crm API request is not successful', async () => {
    nock('https://knock-crm.io')
      .post('/customer/762910/properties')
      .reply(400, { success: false })

    const r = postToCrm(mlsB)
    await expect(r).to.eventually.be.rejectedWith(
      /Request failed with status code 400/
    )
  })
})
