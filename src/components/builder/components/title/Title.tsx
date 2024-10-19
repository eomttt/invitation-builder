'use client';

import { titleAtom } from 'atoms/form';
import { ContentEditable } from 'components/ui/ContentEditable';
import { useAtom } from 'jotai';

const Title = () => {
  const [, setTitle] = useAtom(titleAtom);

  return (
    <div>
      <h1>Title</h1>
      <ContentEditable onInput={e => setTitle(e.currentTarget.innerHTML)} />
    </div>
  );
};

export { Title };
