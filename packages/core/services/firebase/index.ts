import {
  ProcessGoogleSignInAction,
  UserDetectedAction,
} from '../../redux/actions/user';

import { BucketPutResult } from '@cultural-aid/types/storage';
import { Subscription } from 'rxjs';
import { User } from '@cultural-aid/types';
import { authState } from 'rxfire/auth';
import { filter } from 'rxjs/operators';
import { firebase } from '@cultural-aid/core/firebase';
import { store } from '../../redux';

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

  export class Authentication {
    static GoogleSignIn() {
      store.dispatch(new ProcessGoogleSignInAction());
    }

    static LoadUserSession(): Subscription {
      return authState(firebase.auth())
        .pipe<User>(filter<User>((user: User): boolean => !!user))
        .subscribe((user: User) => {
          store.dispatch<UserDetectedAction>(
            new UserDetectedAction({ ...(user.toJSON() as User) })
          );
        });
    }
  }
}
