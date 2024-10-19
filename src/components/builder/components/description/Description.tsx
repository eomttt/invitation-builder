'use client';

import { descriptionAtom } from 'atoms/form';
import { ContentEditable } from 'components/ui/ContentEditable';
import { useSetAtom } from 'jotai';

const Description = () => {
  const setDescription = useSetAtom(descriptionAtom);

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
