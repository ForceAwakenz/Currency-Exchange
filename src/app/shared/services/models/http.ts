// "meta": {
//   "code": 401,
//   "error_type": "auth failed",
//   "error_detail": "Missing or invalid api credentials. See https://currencybeacon.com/api-documentation for details."
// },

type HTTPBaseResponse = {
	meta: {
		code: number;
	};
};

export type HttpErrorResponse = HTTPBaseResponse & {
	meta: {
		error_type: string;
		error_detail: string;
	};
};

export type HTTPSuccessResponse<T> = HTTPBaseResponse & {
	response: T;
};
