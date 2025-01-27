import { Contact } from "../models/contact/Contact";
import { IContact } from "../models/contact/IContact";

export const getAllContactsService = async (): Promise<IContact[]> => {
    try {
        // Obtiene todos los contactos desde la base de datos
        // const contacts = await Contact.find().populate("operations"); //TODO: Colocar para agregar las operaciones

        const contacts = await Contact.find();
        
        return contacts;
    } catch (error) {
        console.error('Error al obtener contactos en el servicio:', error);
        throw new Error('Error al obtener contactos');
    }
};

export const createContactService = async (name: string, email: string, balance: number, operations: string[]): Promise<IContact> => {
    try {
        // Crea un nuevo contacto
        const newContact = new Contact({
            name,
            email,
            balance,
            operations
        });

        // Guarda el contacto en la base de datos
        await newContact.save();

        return newContact;
    } catch (error) {
        console.error('Error al crear contacto en el servicio:', error);
        throw new Error('Error al crear contacto');
    }
};

export const updateContactService = async (id: string, name: string): Promise<IContact> => {
    try {
        // Actualiza el contacto
        const updatedContact = await Contact.findByIdAndUpdate(id, { name } , { new: true });

        if (!updatedContact) {
            throw new Error('Contacto no encontrado');
        }
        return updatedContact;
    } catch (error) {
        console.error('Error al actualizar contacto en el servicio:', error);
        throw new Error('Error al actualizar contacto');
    }
};
