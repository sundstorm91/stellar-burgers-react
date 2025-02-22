import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
	const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

	useEffect(() => {
		const element = document.createElement('div');
		document.body.appendChild(element);
		setPortalElement(element);

		return () => {
			document.body.removeChild(element);
		};
	}, []);

	if (!portalElement) return null;
	return createPortal(children, portalElement);
};

export default Portal;
