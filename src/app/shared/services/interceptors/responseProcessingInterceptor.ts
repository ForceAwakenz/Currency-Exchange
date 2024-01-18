/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, filter, map, of } from 'rxjs';
import { HTTPSuccessResponse } from '../models/http';

export const responseProcessingInterceptor: HttpInterceptorFn = (req, next) => {
	return next(req).pipe(
		filter((event): event is HTTPSuccessResponse<any> => {
			if (event instanceof HttpResponse) return (event as HTTPSuccessResponse<any>).meta.code === 200;
			return false;
		}),
		map(response => response.response),
		catchError(error => {
			console.error(error);
			return of(null);
		}),
		filter(Boolean)
	);
};
