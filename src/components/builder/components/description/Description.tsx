'use client';

import { descriptionAtom } from 'atoms/form';
import { ContentEditable } from 'components/ui/ContentEditable';
import { useAtom } from 'jotai';

const Description = () => {
  const [, setDescription] = useAtom(descriptionAtom);

  return (
    <div>
      <h1>Description</h1>
      <ContentEditable
        onInput={e => setDescription(e.currentTarget.innerHTML)}
      />
    </div>
  );
};

export { Description };
