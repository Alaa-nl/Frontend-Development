// API client for PokeAPI

const BASE_URL = 'https://pokeapi.co/api/v2';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function apiGet<T>(endpoint: string): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status,
      );
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network request failed',
    );
  }
}
