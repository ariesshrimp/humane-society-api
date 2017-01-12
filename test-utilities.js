'use strict'

export const testAnimal = props => Object.assign({}, {
  age: 10.00,
  breed: 'TEST_BREED',
  colors: ['black', 'blue', 'red'],
  dateAvailable: '1484208451145',
  description: 'This is a test animal. It should be removed from the production database at the end of each test run. It should never be visible on production. If you see it there an leave it, you might get fired.',
  fee: 10.00,
  id: 'TEST-10',
  imageURL: 'https://www.test.com/test_image.png',
  name: 'Test Animal',
  sex: 'unknown',
  species: 'TEST_SPECIES',
  weight: 10.00
}, props)

export const testUser = props => Object.assign({}, {
  email: 'test@example.com',
  id: 'TEST-20',
  name: 'Test User',
  password: 'test123456789&$%'
}, props)
