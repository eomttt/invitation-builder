'use client';

import { titleAtom } from 'atoms/form';
import { useAtomValue } from 'jotai';
import { ComponentPropsWithoutRef } from 'react';

type TitleProps = ComponentPropsWithoutRef<'div'>;

const Title = (props: TitleProps) => {
  const title = useAtomValue(titleAtom);

  return <div {...props} dangerouslySetInnerHTML={{ __html: title }} />;
};

export { Title };
