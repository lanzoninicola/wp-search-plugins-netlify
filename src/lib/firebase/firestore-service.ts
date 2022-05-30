import {
  FirestoreAdditionSuccessResponse,
  FirestoreCollectionResponse,
  FirestoreCRUDService,
  FirestoreDocument,
  FirestoreDocumentResponse,
  FirestoreErrorResponse,
  FirestoreSuccessResponse,
} from "./types";
import db from "./firestore-server";

class FirestoreService implements FirestoreCRUDService {
  constructor(private db: FirebaseFirestore.Firestore) {}

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

    const snapshot = await this.db.collection(collectionName).get();
    snapshot.forEach((doc) => {
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
    const docRef = this.db.collection(collectionName);
    const docSnap = await docRef.select(documentId).get();

    if (!docSnap.empty) {
      return {
        ok: true,
        payload: docSnap.docs[0].data(),
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
      const docRef = this.db.collection(collectionName);
      const docSnap = await docRef.add(data);

      return {
        ok: true,
        payload: docSnap.id,
      };
    } catch (e) {
      return {
        ok: false,
        error: e,
      };
    }
  }

  // TODO: Implement update
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
      // const docRef = this.db.collection(collectionName).doc;
      // await updateDoc(docRef.get(), updatedData);

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
      await this.db.collection(collectionName).doc(documentId).delete();
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
   * https://firebase.google.com/docs/firestore/manage-data/delete-data#collections
   *
   * @param {string} collectionName - The name of the Firestore collection
   * @param {string} documentId - The document id to update
   * @returns {object}
   *
   * FirestoreSuccessResponse | FirestoreErrorResponse
   * - *Success response*: {ok: boolean}
   * - *Error response*: {ok: false, error: any}
   */
  async deleteAll(collectionPath, batchSize: number = 20) {
    const collectionRef = this.db.collection(collectionPath);
    const query = collectionRef.orderBy("__name__").limit(batchSize);

    try {
      await this._deleteQueryBatch(query);
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

  private async _deleteQueryBatch(query) {
    const snapshot = await query.get();

    const batchSize = snapshot.size;
    if (batchSize === 0) {
      // When there are no documents left, we are done
      return;
    }

    // Delete documents in a batch
    const batch = this.db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Recurse on the next process tick, to avoid
    // exploding the stack.
    process.nextTick(() => {
      this._deleteQueryBatch(query);
    });
  }
}

// Initialize the FirestoreService
const firestoreService = new FirestoreService(db);
export default firestoreService;
