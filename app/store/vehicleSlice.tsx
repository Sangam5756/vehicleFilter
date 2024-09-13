import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Vehicle } from '../constants/TypesVehicle';

interface VehicleState {
  data: Vehicle[];
  loading: boolean;
}

const initialState: VehicleState = {
  data: [],
  loading: false,
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Vehicle[]>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setData, setLoading } = vehicleSlice.actions;
export default vehicleSlice.reducer;
