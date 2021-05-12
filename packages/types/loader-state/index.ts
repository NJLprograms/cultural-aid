export interface ILoadingState<T> {
  error: Error;
  loading: boolean;
  value: T;
}

export interface IDetailedLoadingState<T> extends ILoadingState<T> {
  loadingMessage: string;
}

export class LoaderState<T> implements ILoadingState<T>, ProcessState {
  error = null;
  loading = false;
  constructor(readonly value: T) {}
}

export class DetailedLoaderState<T>
  extends LoaderState<T>
  implements IDetailedLoadingState<T> {
  loadingMessage: string = '';
  constructor(readonly value: T) {
    super(value);
  }
}

interface ProcessState {
  [key: string]: any;
}
