import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { catchError, filter, of } from 'rxjs';
import { HTTPSuccessResponse } from '../models/http';

export const responseProcessingInterceptor: HttpInterceptorFn = (req, next) => {
	return next(req).pipe(
		filter((event: HttpEvent<unknown>) => event instanceof HttpResponse),
		filter(
			(response): response is HTTPSuccessResponse<unknown> =>
				(response as HTTPSuccessResponse<unknown>).meta.code === 200
		),
		catchError(error => {
			console.error(error);
			return of(null);
		}),
		filter(Boolean)
	);
};
