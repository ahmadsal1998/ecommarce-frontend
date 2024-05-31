import { EscButtonConfigProps } from './EscButtonConfigProps';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type EscButtonInt = {
	to: string;
	buttonStyle: EscButtonConfigProps;
};

export type EscButtonProps = PartialBy<EscButtonInt, 'to'>;
