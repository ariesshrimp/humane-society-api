'use strict'
import * as Database from './data'
import R from 'ramda'
import { getByID } from '../users/data'

export default {
  Animal: {
    followers ({ followers }) {
      const follows = R.keys(followers)
      return Promise.all(R.map(getByID, follows))
    }
  },
  Query: {
    animal (_, { id }) {
      return Database.getByID(id)
    },
    animalsCheaperThan (_, { maxPrice }) {
      return Database.getCheaperThan(maxPrice)
    },
    animalsNamed (_, { name }) {
      return Database.getAllNamed(name)
    },
    animalsOfBreed (_, { breed }) {
      return Database.getByBreed(breed)
    },
    animalsOfSex (_, { sex }) {
      return Database.getAllOfSex(sex)
    },
    animalsOfSpecies (_, { species }) {
      return Database.getAllSpecies(species)
    },
    animalsOlderThan (_, { minAge }) {
      return Database.getOlderThan(minAge)
    },
    animalsYoungerThan (_, { maxAge }) {
      return Database.getYoungerThan(maxAge)
    }
  }
}
