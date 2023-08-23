interface contactInterface {
    contactInfo(contacts: any): Promise<any>;
}
declare class ContactRepository implements contactInterface {
    contactInfo(contact: any): Promise<any>;
}
declare const _default: ContactRepository;
export default _default;
