import { Layout } from 'constants/layout';
import { atom } from 'jotai';

const layoutAtom = atom<Layout>(Layout.Basic);

const titleAtom = atom('');
const descriptionAtom = atom('');

export { descriptionAtom, layoutAtom, titleAtom };
