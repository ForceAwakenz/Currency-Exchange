import { ExchangeForm, ExchangeFormValues, ExtractValuesFromForm } from '../shared/models/forms';

export const isValuesFromExchangeForm = (
	formValues: ExchangeFormValues
): formValues is ExtractValuesFromForm<ExchangeForm> => !!formValues.amount && !!formValues.currency;
