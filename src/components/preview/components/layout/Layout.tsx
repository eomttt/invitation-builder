'use client';

import { layoutAtom } from 'atoms/form';
import { Layout as LayoutConstant } from 'constants/layout';
import { useAtomValue } from 'jotai';
import { ComponentPropsWithoutRef } from 'react';

type LayoutProps = ComponentPropsWithoutRef<'div'>;

const Layout = ({ children }: LayoutProps) => {
  const layout = useAtomValue(layoutAtom);

  switch (layout) {
    case LayoutConstant.Round: {
      return (
        <div className="h-screen text-center border-2 bg-red-400">
          {children}
        </div>
      );
    }
    case LayoutConstant.Basic: {
      return <div className="h-screen text-center border-2">{children}</div>;
    }
  }
};

export { Layout };
