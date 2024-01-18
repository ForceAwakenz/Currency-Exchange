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

export type ExchangeFormValues = Partial<ExtractValuesFromForm<ExchangeForm>>;

export type AppFormsDataValuesType = Record<number, ExchangeFormValues>;
