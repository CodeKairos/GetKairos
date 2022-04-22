import { describe, expect, it } from 'vitest'
import { isValidUsername } from '~/remote/utilsUsers'

describe('Remote API utils for user management', () => {
  it('validates username', async() => {
    expect(isValidUsername('x')).to.eq(false)
    expect(isValidUsername('Get  Kairos')).to.eq(false)
    expect(isValidUsername('get_.kairos')).to.eq(false)
    expect(isValidUsername('.kairos')).to.eq(false)
    expect(isValidUsername(' kairos')).to.eq(false)
    expect(isValidUsername('Kairos_')).to.eq(false)
    expect(isValidUsername('Get kairos ')).to.eq(false)
    expect(isValidUsername('Get Jr.. Kairos')).to.eq(false)
    expect(isValidUsername('Kairos , Get')).to.eq(false)
    expect(isValidUsername('Kairos ,Get')).to.eq(false)
    expect(isValidUsername('Kairos .Get')).to.eq(false)
    expect(isValidUsername('get -kairos')).to.eq(false)
    expect(isValidUsername('get- kairos')).to.eq(false)
    expect(isValidUsername('get _kairos')).to.eq(false)
    expect(isValidUsername('get_ kairos')).to.eq(false)

    expect(isValidUsername('TJ')).to.eq(true)
    expect(isValidUsername('T.J.')).to.eq(true)
    expect(isValidUsername('get kairos')).to.eq(true)
    expect(isValidUsername('get-kairos')).to.eq(true)
    expect(isValidUsername('get_kairos')).to.eq(true)
    expect(isValidUsername('get.kairos')).to.eq(true)
    expect(isValidUsername('get. kairos')).to.eq(true)
    expect(isValidUsername('B.C. Kairos')).to.eq(true)
    expect(isValidUsername('Get Jr. Kairos')).to.eq(true)
    expect(isValidUsername('Kairos, Get')).to.eq(true)
    expect(isValidUsername('Kairos, B.C.')).to.eq(true)
  })
})
