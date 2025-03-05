import { QueryInterface } from "sequelize";
import bcrypt from "bcrypt";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface: QueryInterface): Promise<void> {
    const hashedPassword = await bcrypt.hash("Admin@123", 10); // Hash password
    await queryInterface.bulkInsert("Users", [
      {
        first_name: "Admin",
        last_name: "User",
        email: "admin@example.com",
        password: hashedPassword,
        role: "admin", // Assuming your model has a role field
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.bulkDelete("Users", { email: "admin@example.com" });
  },
};
