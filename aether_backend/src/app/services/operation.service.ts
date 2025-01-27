import { Operation } from "../models/operations/Operation";
import { IOperation } from "../models/operations/IOperation";
import { Contact } from "../models/contact/Contact";
import { Types } from "mongoose";

export const getAllOperationsService = async (): Promise<IOperation[]> => {
  try {
    // Obtiene todas las operaciones desde la base de datos
    const operations = await Operation.find();

    return operations;
  } catch (error) {
    console.error("Error al obtener operaciones en el servicio:", error);
    throw new Error("Error al obtener operaciones");
  }
};

export const createOperationService = async (
  contactId: string,
  amount: number,
  concept: string,
  type: string
): Promise<IOperation> => {
  try {
    // Crear operación
    const operation = await Operation.create({
      contactId,
      amount,
      concept,
      type,
    });

    // Actualizar el balance del contacto
    const update =
      type === "income"
        ? { $inc: { balance: amount } }
        : { $inc: { balance: -amount } };
    const contact = await Contact.findByIdAndUpdate(contactId, update, {
      new: true,
    });

    // Agregar la operación al contacto
    if (contact) {
      contact.operations.push(operation._id as Types.ObjectId);
      await contact.save();
    }

    return operation; // Retornar la operación creada
  } catch (error) {
    console.error("Error al crear operación en el servicio:", error);
    throw new Error("Error al crear operación");
  }
};

export const getOperationsService = async (
  contactId: string
): Promise<IOperation[]> => {
  try {
    // Obtiene todas las operaciones de un contacto
    const operations = await Operation.find({ contactId });

    await Promise.all(
      operations.map((operation) => operation.populate("contactId"))
    );

    return operations;
  } catch (error) {
    console.error("Error al obtener operaciones en el servicio:", error);
    throw new Error("Error al obtener operaciones");
  }
};
