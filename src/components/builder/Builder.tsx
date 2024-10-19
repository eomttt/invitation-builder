import { ComponentPropsWithoutRef } from 'react';

import { Description } from './components/description/Description';
import { Layout } from './components/layout/Layout';
import { Title } from './components/title/Title';

type BuilderProps = ComponentPropsWithoutRef<'div'>;

const Builder = ({ className, ...props }: BuilderProps) => {
  return (
    <div className={className} {...props}>
      <Layout />
      <Title />
      <Description />
    </div>
  );
};

export { Builder };
