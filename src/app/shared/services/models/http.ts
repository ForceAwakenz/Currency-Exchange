// "meta": {
//   "code": 401,
//   "error_type": "auth failed",
//   "error_detail": "Missing or invalid api credentials. See https://currencybeacon.com/api-documentation for details."
// },

import { HttpEvent } from '@angular/common/http';

type HTTPBaseResponse = {
	meta: {
		code: number;
	};
} & HttpEvent<unknown>;

export type HttpErrorResponse = HTTPBaseResponse & {
	meta: {
		error_type: string;
		error_detail: string;
	};
};

export type HTTPSuccessResponse<T> = HTTPBaseResponse & {
	response: T;
};

export type HTTPResponse<T> = HTTPSuccessResponse<T> | HttpErrorResponse;
