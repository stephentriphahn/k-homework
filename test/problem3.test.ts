import { expect } from 'chai'
import { mergeStrings } from '../src/problem3'

describe('mergeStrings', () => {
  it('returns an empty string when given two empty strings', () => {
    const r = mergeStrings('', '')
    expect(r).to.eql('')
  })

  it('returns an empty string when given one empty strings', () => {
    const r = mergeStrings('', 'abc')
    expect(r).to.eql('abc', 'first string empty')

    const r2 = mergeStrings('abc', '')
    expect(r2).to.eql('abc', 'second string empty')
  })

  it('merges two strings of equal legnth', () => {
    const r = mergeStrings('ace', 'bdf')
    expect(r).to.eql('abcdef')
  })

  it('merges two strings when first string is longer', () => {
    const r = mergeStrings('aceghi', 'bdf')
    expect(r).to.eql('abcdefghi')
  })

  it('merges two strings when second string is longer', () => {
    const r = mergeStrings('ace', 'bdfghi')
    expect(r).to.eql('abcdefghi')
  })
})
