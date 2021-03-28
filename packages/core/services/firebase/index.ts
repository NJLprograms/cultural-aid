import { BucketPutResult } from '@cultural-aid/types/storage';
import { firebase } from '@cultural-aid/core/firebase';

export namespace FirebaseService {
  export class Storage {
    static async put(file: File): Promise<BucketPutResult> {
      const { seconds, nanoseconds } = firebase.firestore.Timestamp.now();
      const bucket: firebase.default.storage.Reference = firebase
        .storage()
        .ref();

      // File name + number of ms since epoch
      const objectReference: firebase.default.storage.Reference = bucket.child(
        `${file.name}-${seconds * 1000 + nanoseconds / 1000}`
      );

      const {
        metadata,
        ref,
      }: firebase.default.storage.UploadTaskSnapshot = await objectReference.put(
        file,
        { contentType: file.type }
      );

      const imgSrc = await ref.getDownloadURL();

      return {
        imgSrc,
        ...metadata,
        timeCreated: Date.parse(metadata.timeCreated),
        updated: Date.parse(metadata.updated),
      };
    }
  }
}
