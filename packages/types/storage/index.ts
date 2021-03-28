export interface StorageFile extends File {
  src?: string;
}

export interface BucketPutResult
  extends Omit<
    firebase.default.storage.FullMetadata,
    'timeCreated' | 'updated'
  > {
  imgSrc: string;
  timeCreated: number;
  updated: number;
}
