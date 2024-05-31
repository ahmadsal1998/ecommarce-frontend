import EscLoading from '@esc/core/EscLoading';
import { ReactNode, Suspense } from 'react';
import { EscLoadingProps } from '@esc/core/EscLoading/EscLoading';

type EscSuspenseProps = {
	loadingProps?: EscLoadingProps;
	children: ReactNode;
};

/**
 * The EscSuspense component is a wrapper around the React Suspense component.
 * It is used to display a loading spinner while the wrapped components are being loaded.
 * The component is memoized to prevent unnecessary re-renders.
 * React Suspense defaults
 * For to Avoid Repetition
 */
function EscSuspense(props: EscSuspenseProps) {
	const { children, loadingProps } = props;
	return <Suspense fallback={<EscLoading {...loadingProps} />}>{children}</Suspense>;
}

export default EscSuspense;
