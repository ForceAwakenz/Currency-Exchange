import { apiKeyInterceptor } from './api-key.interceptor';
import { responseProcessingInterceptor } from './response-processing.interceptor';

export const INTERCEPTORS = [apiKeyInterceptor, responseProcessingInterceptor];
