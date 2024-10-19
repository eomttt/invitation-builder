'use client';

import { layoutAtom } from 'atoms/form';
import { Label } from 'components/ui/label';
import { RadioGroup, RadioGroupItem } from 'components/ui/radio-group';
import { Layout as LayoutConstants } from 'constants/layout';
import { useSetAtom } from 'jotai';

const Layout = () => {
  const setLayout = useSetAtom(layoutAtom);

  return (
    <RadioGroup
      defaultValue={LayoutConstants.Basic}
      onValueChange={value => {
        setLayout(value as LayoutConstants);
      }}
    >
      {Object.entries(LayoutConstants).map(([key, value]) => (
        <div key={key} className="flex items-center space-x-2">
          <RadioGroupItem value={value} id={value} />
          <Label htmlFor={value}>{value}</Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export { Layout };
