import { Builder } from 'components/builder/Builder';
import { Preview } from 'components/preview/Preview';

export default function Page() {
  return (
    <div className="flex gap-x-10">
      <Preview />
      <Builder />
    </div>
  );
}
