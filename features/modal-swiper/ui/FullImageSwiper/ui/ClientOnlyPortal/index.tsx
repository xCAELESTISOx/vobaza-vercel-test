
import { useEffect, useState, useRef, ReactNode } from 'react';

import { createPortal } from 'react-dom';

interface IClientOnlyPortalProps {
  children: ReactNode;
  selector: string;
}

const ClientOnlyPortal = ({ children, selector }: IClientOnlyPortalProps) => {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(selector);
    setMounted(true);
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
};

export default ClientOnlyPortal;
