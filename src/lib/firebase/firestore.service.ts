import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import {
  FirestoreAdditionSuccessResponse,
  FirestoreCollectionResponse,
  FirestoreCRUDService,
  FirestoreDocument,
  FirestoreDocumentResponse,
  FirestoreErrorResponse,
  FirestoreSuccessResponse,
} from "./firestore.interfaces";

export default class FirestoreService implements FirestoreCRUDService {
  constructor(private db: Firestore) {}

  /**
   * @description Return all documents in a collection
   *
   * @param {string} collectionName - The name of the Firestore collection
   * @returns {object}
   *
   * FirestoreCollectionResponse
   * @example
   * {
   *    {
   *     ok: boolean,
   *     payload: documentId#1: {...documentData}
   *     },
   *    {
   *     ok: boolean,
   *     payload: documentId#2: {...documentData}
   *     },
   * ...
   * }
   */
  async getAll(collectionName: string): Promise<FirestoreCollectionResponse> {
    let result: FirestoreDocument[] = [];

    const querySnapshot = await getDocs(collection(this.db, collectionName));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      result = [...result, data];
    });

    return {
      ok: true,
      payload: result,
    };
  }

  /**
   * @description Return a document by id
   * If a document is not found, it is returned as null in the payload of the response
   *
   * @param {string} collectionName - The name of the Firestore collection
   * @param {string} documentId
   * @returns {object} - FirestoreDocumentResponse - {ok: boolean, payload: DocumentData | null, error: any}
   */
  async getById(
    collectionName: string,
    documentId: string
  ): Promise<FirestoreDocumentResponse> {
    const docRef = doc(this.db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        ok: true,
        payload: docSnap.data(),
      };
    } else {
      return {
        ok: false,
        payload: null,
      };
    }
  }

  /**
   * @description Add a document to the collection passed as argument
   * If an error occurs, the error is returned in the payload of the response
   *
   * @param {string} collectionName - The name of the Firestore collection
   * @param {object} data - The document data
   * @returns {object}
   *
   * FirestoreAdditionSuccessResponse | FirestoreErrorResponse
   * - *Success response*: {ok: boolean, payload: DocumentData}
   * - *Error response*: {ok: false, error: any}
   */
  async add(
    collectionName: string,
    data: { [key: string]: any }
  ): Promise<FirestoreAdditionSuccessResponse | FirestoreErrorResponse> {
    try {
      const docRef = await addDoc(collection(this.db, collectionName), data);

      return {
        ok: true,
        payload: docRef.id,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  /**
   * @description Update a document by id
   *
   * @param {string} collectionName - The name of the Firestore collection
   * @param {string} documentId - The document id to update
   * @param {object} updatedData - Data to update
   * @returns {object}
   *
   * FirestoreSuccessResponse | FirestoreErrorResponse
   * - *Success response*: {ok: boolean}
   * - *Error response*: {ok: false, error: any}
   */
  async update(
    collectionName: string,
    documentId: string,
    updatedData: any
  ): Promise<FirestoreSuccessResponse | FirestoreErrorResponse> {
    try {
      const docRef = doc(this.db, collectionName, documentId);

      await updateDoc(docRef, {
        ...updatedData,
      });

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  /**
   * @description Delete a document by id
   *
   * @param {string} collectionName - The name of the Firestore collection
   * @param {string} documentId - The document id to update
   * @returns {object}
   *
   * FirestoreSuccessResponse | FirestoreErrorResponse
   * - *Success response*: {ok: boolean}
   * - *Error response*: {ok: false, error: any}
   */
  async delete(
    collectionName: string,
    documentId: string
  ): Promise<FirestoreSuccessResponse | FirestoreErrorResponse> {
    try {
      await deleteDoc(doc(this.db, collectionName, documentId));
      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  /**
   * @description Delete all document in a collection
   *
   * @param {string} collectionName - The name of the Firestore collection
   * @param {string} documentId - The document id to update
   * @returns {object}
   *
   * FirestoreSuccessResponse | FirestoreErrorResponse
   * - *Success response*: {ok: boolean}
   * - *Error response*: {ok: false, error: any}
   */
  async deleteAll(
    collectionName: string
  ): Promise<FirestoreSuccessResponse | FirestoreErrorResponse> {
    try {
      const querySnapshot = await getDocs(collection(this.db, collectionName));

      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(this.db, collectionName, document.id));
      });

      return {
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }
}
