import { faker } from "@faker-js/faker";

export function generateMockPets(amount = 50) {
  const pets = [];

  for (let i = 0; i < amount; i++) {
    pets.push({
      name: faker.animal.dog(),
      specie: faker.helpers.arrayElement(["dog", "cat", "hamster", "parrot"]),
      birthDate: faker.date.past(),
      adopted: false,
      owner: null,
    });
  }

  return pets;
}
