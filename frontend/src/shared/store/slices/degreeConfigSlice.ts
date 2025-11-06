import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DegreeConfiguration {
  id: string;
  degreeCode: string;
  degreeName: string;
  organizationName: string;
  courseDescription: string;
  admissionYear: string;
}

interface DegreeConfigState {
  current: DegreeConfiguration | null;
  loading: boolean;
}

const initialState: DegreeConfigState = {
  current: null,
  loading: false,
};

const degreeConfigSlice = createSlice({
  name: 'degreeConfig',
  initialState,
  reducers: {
    setDegreeConfig: (state, action: PayloadAction<DegreeConfiguration>) => {
      state.current = action.payload;
    },
  },
});

export const { setDegreeConfig } = degreeConfigSlice.actions;
export default degreeConfigSlice.reducer;
