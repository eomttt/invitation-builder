import { Builder } from 'components/builder/Builder';
import { Preview } from 'components/preview/Preview';

export default function Page() {
  return (
    <div className="grid grid-cols-2 gap-x-10">
      <Preview />
      <Builder />
    </div>
  );
}
