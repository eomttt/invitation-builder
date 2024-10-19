'use client';

import { titleAtom } from 'atoms/form';
import { Textarea } from 'components/ui/textarea';
import { useAtom } from 'jotai';

const Title = () => {
  const [title, setTitle] = useAtom(titleAtom);

  return <Textarea value={title} onChange={e => setTitle(e.target.value)} />;
};

export { Title };
