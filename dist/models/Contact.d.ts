import { Model, Optional } from 'sequelize';
interface ContactAttributes {
    id: number;
    phoneNumber: string | null;
    email: string | null;
    linkedId: number | null;
    linkPrecedence: 'primary' | 'secondary';
}
interface ContactCreationAttributes extends Optional<ContactAttributes, 'id'> {
}
declare class Contact extends Model<ContactAttributes, ContactCreationAttributes> implements ContactAttributes {
    id: number;
    phoneNumber: string | null;
    email: string | null;
    linkedId: number | null;
    linkPrecedence: 'primary' | 'secondary';
}
export default Contact;
