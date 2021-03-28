export class ProcessSlice {
  error: Error = null;
  loading: boolean = false;
  success: boolean = false;
}

export class ProcessState {
  RESET = { ...new ProcessSlice() };
}
