import axios from 'axios';

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: Record<string, { official: string; common: string }>;
  };
}

export interface CountryServiceError {
  status: number;
  message: string;
  error?: string;
}

export const countryService = {
  getAllCountries: async () => {
    try {
      const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all?fields=name');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          status: error.response?.status || 500,
          message: error.message,
          error: error.response?.data?.message || 'Failed to fetch countries',
        } as CountryServiceError;
      }
      return {
        status: 500,
        message: 'An unexpected error occurred',
        error: 'Failed to fetch countries',
      } as CountryServiceError;
    }
  },
};
