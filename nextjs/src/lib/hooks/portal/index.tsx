import type { ReactNode } from 'react';
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = { children: ReactNode };

export const usePortal = (selector: string) => {
  function Portal({ children }: PortalProps) {
    const [container, setContainer] = useState<HTMLElement>();

    useEffect(() => {
      const container = document.getElementById(selector);
      if (container) setContainer(container);
    }, []);

    return container ? createPortal(children, container) : null;
  }

  return useCallback(Portal, [selector]);
};
