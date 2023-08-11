import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../dbConfig/config';

interface ContactAttributes {
  id: number;
  phoneNumber: string | null;
  email: string | null;
  linkedId: number | null;
  linkPrecedence:  'primary' | 'secondary';
}

interface ContactCreationAttributes extends Optional<ContactAttributes, 'id'> {}

class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
  public id!: number;
  public phoneNumber!: string | null;
  public email!: string | null;
  public linkedId!: number | null;
  public linkPrecedence!:  'primary' | 'secondary';
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    phoneNumber: {type:DataTypes.STRING,allowNull:false},
    email: {type:DataTypes.STRING,allowNull:false},
    linkedId: DataTypes.INTEGER,
    linkPrecedence: DataTypes.ENUM('primary', 'secondary'),
  },
  {
    sequelize,
    modelName: 'Contact',
  }
);

export default Contact;