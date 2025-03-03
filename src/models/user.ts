import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role?: 'resident' | 'caregiver' | 'staff' | 'admin';
  contact_number?: string;
  emergency_contact?: Record<string, any>;
  profile_picture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public first_name!: string;
  public last_name!: string;
  public role!: 'resident' | 'caregiver' | 'staff' | 'admin';
  public contact_number?: string;
  public emergency_contact?: Record<string, any>;
  public profile_picture?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: any) {
    // Define associations here
  }
}

export const UserModel = (sequelize: Sequelize) => {
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('resident', 'caregiver', 'staff', 'admin'),
        defaultValue: 'resident',
      },
      contact_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      emergency_contact: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};

// Now you can import the User model like this:
export { User };
