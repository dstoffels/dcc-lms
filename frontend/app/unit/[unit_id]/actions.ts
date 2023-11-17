import api from '@utils/api';
import { getAuthConfig } from '@utils/auth';
import { Unit as UnitType } from '../../../lib/types';

export async function fetchUnit(unit_id: string): Promise<UnitType | null> {
	try {
		const config = getAuthConfig();
		const response = await api.get(`/units/${unit_id}`, config);
		return response.json();
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function fetchUnitTypes(): Promise<string[]> {
	try {
		const response = await api.get('/units/types');
		return response.json();
	} catch (error) {
		console.log(error);
		return [];
	}
}
