import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Country } from '@/services/countryNameServices';

interface CountryState {
  countries: string[];
  loading: boolean;
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

export const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    fetchCountriesRequest: state => {
      state.loading = true;
      state.error = null;
    },
    fetchCountriesSuccess: (state, action: PayloadAction<Country[]>) => {
      state.loading = false;
      state.countries = action.payload.map(country => country.name.common);
    },
    fetchCountriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchCountriesRequest, fetchCountriesSuccess, fetchCountriesFailure } =
  countrySlice.actions;

export default countrySlice.reducer;
