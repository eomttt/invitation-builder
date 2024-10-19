import { Description } from './components/description/Description';
import { Title } from './components/title/Title';

const Builder = () => {
  return (
    <div className="grow shrink-0 basis-2/5">
      <Title />
      <Description />
    </div>
  );
};

export { Builder };
