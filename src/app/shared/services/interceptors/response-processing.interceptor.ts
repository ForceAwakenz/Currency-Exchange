import {
	HttpEvent,
	HttpInterceptorFn,
	HttpResponse,
} from '@angular/common/http';
import { catchError, filter, of, tap } from 'rxjs';

export const responseProcessingInterceptor: HttpInterceptorFn = (req, next) => {
	return next(req).pipe(
		filter((event: HttpEvent<unknown>) => event instanceof HttpResponse),
		catchError(error => {
			console.error(error);
			return of(null);
		}),
		filter(Boolean)
	);
};
