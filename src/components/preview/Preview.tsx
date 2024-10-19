import { Description } from './components/description/Description';
import { Layout } from './components/layout/Layout';
import { Title } from './components/title/Title';

const Preview = () => {
  return (
    <div className="grow shrink-0 basis-2/5">
      <Layout>
        <Title />
        <Description />
      </Layout>
    </div>
  );
};

export { Preview };
