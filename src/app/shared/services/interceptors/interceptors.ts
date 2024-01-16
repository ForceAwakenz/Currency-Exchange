import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { apiKeyInterceptor } from './api-key.interceptor';

export const INTERCEPTORS = [apiKeyInterceptor];
