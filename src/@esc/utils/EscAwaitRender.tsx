import { useEffect, useState } from 'react';

type EscAwaitRenderProps = {
	delay?: number;
	children: React.ReactNode;
};

function EscAwaitRender(props: EscAwaitRenderProps) {
	const { delay = 0, children } = props;
	const [awaitRender, setAwaitRender] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setAwaitRender(false);
		}, delay);
	}, [delay]);

	return awaitRender ? null : children;
}

export default EscAwaitRender;
