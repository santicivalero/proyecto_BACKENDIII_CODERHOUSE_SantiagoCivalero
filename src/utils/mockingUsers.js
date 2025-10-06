import bcrypt from "bcrypt";
import { faker } from "@faker-js/faker";

export function generateMockUsers(amount = 50) {
  const users = [];

  for (let i = 0; i < amount; i++) {
    const hashedPassword = bcrypt.hashSync("coder123", 10);
    users.push({
      _id: faker.database.mongodbObjectId(),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: hashedPassword,
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: [],
      createdAt: faker.date.recent(),
    });
  }

  return users;
}
