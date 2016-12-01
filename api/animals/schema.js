export const Animal = `
  type Animal {
    adopt_fee: Float
    age: Float
    breed: String
    color: [ String ]
    date_available: String
    description: String
    friends:  [ Animal ]
    id: String
    image_url: String
    name: String
    sex: String
    species: String
    weight: Float
  }
`

export const AnimalQuery = `
  type Query {
    getAllSpecies(species: String): [ Animal ]
    getAllNamed(name: String): [ Animal ]
    getAllOfSex(sex: String): [ Animal ]
    getAnimal(id: String): Animal
    getByBreed(breed: String): [ Animal ]
    getCheaperThan(maxPrice: Float): [ Animal ]
    getOlderThan(minAge: Float): [ Animal ]
    getYoungerThan(maxAge: Float): [ Animal ]
    onlyThoseWithImage: [ Animal ]
    sortByDateAvailable: [ Animal ]
  }
`

export const Schema = `
  type Animal {
    adopt_fee: Float
    age: Float
    breed: String
    color: [ String ]
    date_available: String
    description: String
    friends:  [ Animal ]
    id: String
    image_url: String
    name: String
    sex: String
    species: String
    weight: Float
  }
  
  type Query {
    getAllSpecies(species: String): [ Animal ]
    getAllNamed(name: String): [ Animal ]
    getAllOfSex(sex: String): [ Animal ]
    getAnimal(id: String): Animal
    getByBreed(breed: String): [ Animal ]
    getCheaperThan(maxPrice: Float): [ Animal ]
    getOlderThan(minAge: Float): [ Animal ]
    getYoungerThan(maxAge: Float): [ Animal ]
    onlyThoseWithImage: [ Animal ]
    sortByDateAvailable: [ Animal ]
  }
`
