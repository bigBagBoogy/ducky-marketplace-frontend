// InViewHandler.tsx
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface InViewHandlerProps {
  id: string;
  onInViewChange: (id: string, inView: boolean) => void;
  children: React.ReactNode;
}

const InViewHandler: React.FC<InViewHandlerProps> = ({ id, onInViewChange, children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    onInViewChange(id, inView);
  }, [id, inView, onInViewChange]);

  return <div ref={ref}>{children}</div>;
};

export default InViewHandler;
