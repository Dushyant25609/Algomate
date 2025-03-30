import { call, CallEffect, put, PutEffect, takeLatest } from 'redux-saga/effects';
import { countryService, Country, CountryServiceError } from '@/services/countryNameServices';
import {
  fetchCountriesSuccess,
  fetchCountriesFailure,
  fetchCountriesRequest,
} from '../slices/countrySlice';

type CountrySagaEffect =
  | CallEffect<Country[] | CountryServiceError>
  | PutEffect<{ type: string; payload: Country[] | string }>;

function* fetchCountriesSaga(): Generator<
  CountrySagaEffect,
  void,
  Country[] | CountryServiceError
> {
  try {
    const response = yield call(countryService.getAllCountries);
    if ('status' in response) {
      // Handle error response
      const error = response as CountryServiceError;
      yield put(fetchCountriesFailure(error.message));
    } else {
      yield put(fetchCountriesSuccess(response as Country[]));
    }
  } catch (error) {
    let errorMessage = 'Failed to fetch countries';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    yield put(fetchCountriesFailure(errorMessage));
  }
}

export function* countrySaga() {
  yield takeLatest(fetchCountriesRequest.type, fetchCountriesSaga);
}
