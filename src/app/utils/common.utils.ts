export const getSingleValue = <T>(obj: Record<PropertyKey, T>): T =>
	Object.values(obj)[0];
