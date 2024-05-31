import { EscSettingsConfigType } from '@esc/core/EscSettings/EscSettings';

/**
 * The type definition for a user object.
 */
export type User = {
	uid: string;
	role: string[] | string | null;
	data: {
		displayName: string;
		photoURL?: string;
		email?: string;
		roles: string[],
		shortcuts?: string[];
		settings?: Partial<EscSettingsConfigType>;
		loginRedirectUrl?: string; // The URL to redirect to after login.
	};
};
