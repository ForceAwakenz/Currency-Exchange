import { FormControl } from '@angular/forms';
import { CurrencySymbolType } from './currency-symbols';

// ==================== Utils ====================

export type ExtractValuesFromForm<T> = {
	[K in keyof T]: T[K] extends FormControl<infer U> ? U : never;
};

// ==================== Forms ====================

export type ExchangeForm = {
	amount: FormControl<string>;
	currency: FormControl<CurrencySymbolType>;
};

export type ExchangeFormValues = ExtractValuesFromForm<ExchangeForm>;

export type AppFormsDataValuesType = Record<number, ExchangeFormValues>;

export type CurrentRequestType = ExchangeFormValues & { initiator: 1 | 2 };

export type ConvertPropsType = {
	from: CurrencySymbolType;
	to: CurrencySymbolType;
	amount: string;
};
