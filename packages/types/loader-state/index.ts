export interface ILoadingState<T> {
  error: Error;
  loading: boolean;
  value: T;
}

export class LoaderState<T> implements ILoadingState<T>, ProcessState {
  error = null;
  loading = false;
  constructor(readonly value: T) {}
}

interface ProcessState {
  [key: string]: any;
}
