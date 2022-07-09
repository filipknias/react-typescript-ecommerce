import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Request {
  type: string;
  inProgress: boolean;
  isError: boolean;
  id?: string;
}

interface RequestsState {
  requests: Request[];
}

const initialState: RequestsState = {
  requests: [],
};

interface RequestPayload {
  type: string;
  id?: string;
}

const requestSlices = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    requestStart(state, { payload }: PayloadAction<RequestPayload>) {
      state.requests.push({
        ...payload,
        inProgress: true,
        isError: false,
      }); 
    },
    requestSuccess(state, { payload }: PayloadAction<RequestPayload>) {
      state.requests = state.requests.filter(({ type }) => {
        return type !== payload.type;
      });
    },  
    requestFail(state, { payload }: PayloadAction<RequestPayload>) {
      state.requests = state.requests.map((request) => {
        if (payload.type === request.type) return { ...request, inProgress: false, isError: true };
        return request;
      });
    },
    deleteRequest(state, { payload }: PayloadAction<RequestPayload>) {
      state.requests = state.requests.filter(({ type }) => type !== payload.type);
    },
  },
});

export const getRequest = (state: RequestsState, type: string) => {
  return state.requests.find((request) => request.type === type);
};

export const getRequestById = (state: RequestsState, type: string, id: string) => {
  return state.requests.find((request) => request.type === type && request.id === id);
};

export const getRequestInProgress = (state: RequestsState, type: string, id?: string) => {
  return state.requests.find((request) => request.type === type && request.id === id && request.inProgress);
};

export const { requestStart, requestSuccess, requestFail, deleteRequest } = requestSlices.actions;
export default requestSlices.reducer;