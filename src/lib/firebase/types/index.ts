export type FirestoreDocumentId = string;
export type FirestoreDocument = { [key: string]: any };

export interface FirestoreCollectionResponse {
  ok: boolean;
  payload?: FirestoreDocument[];
  error?: any;
}

export interface FirestoreDocumentResponse {
  ok: boolean;
  payload?: FirestoreDocument | null;
  error?: any;
}

export interface FirestoreAdditionSuccessResponse {
  ok: true;
  payload: FirestoreDocumentId;
}

export interface FirestoreSuccessResponse {
  ok: true;
}

export interface FirestoreErrorResponse {
  ok: false;
  error: any;
}

export interface FirestoreCRUDService {
  getAll(collectionName: string): Promise<FirestoreCollectionResponse>;
  getById(
    collectionName: string,
    documentId: string
  ): Promise<FirestoreDocumentResponse>;
  add(
    collectionName: string,
    data: { [key: string]: any }
  ): Promise<FirestoreAdditionSuccessResponse | FirestoreErrorResponse>;
  update(
    collectionName: string,
    documentId: string,
    updatedData: any
  ): Promise<FirestoreSuccessResponse | FirestoreErrorResponse>;
  delete(
    collectionName: string,
    documentId: string
  ): Promise<FirestoreSuccessResponse | FirestoreErrorResponse>;
  deleteAll(collectionName: string): Promise<FirestoreDocumentResponse>;
}
