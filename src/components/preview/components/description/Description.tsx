'use client';

import { descriptionAtom } from 'atoms/form';
import { useAtomValue } from 'jotai';
import { ComponentPropsWithoutRef } from 'react';

type DescriptionProps = ComponentPropsWithoutRef<'div'>;

const Description = (props: DescriptionProps) => {
  const description = useAtomValue(descriptionAtom);

  return <h2 {...props} dangerouslySetInnerHTML={{ __html: description }} />;
};

export { Description };
