import { ComponentPropsWithoutRef } from 'react';

import { Description } from './components/description/Description';
import { Layout } from './components/layout/Layout';
import { Title } from './components/title/Title';

type PreviewProps = ComponentPropsWithoutRef<'div'>;

const Preview = ({ className, ...props }: PreviewProps) => {
  return (
    <div className={className} {...props}>
      <Layout>
        <Title />
        <Description />
      </Layout>
    </div>
  );
};

export { Preview };
