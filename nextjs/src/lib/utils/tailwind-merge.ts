import { extendTailwindMerge } from 'tailwind-merge';
import tailwindConfig from '../../../tailwind.config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addPrefixToKeys = (prefix: string, obj: Record<string, any>) => {
  return Object.keys(obj).map((key) => `${prefix}-${key}`);
};

const getClassGroups = () => {
  const { fontFamily, fontSize, aspectRatio, boxShadow, animation } =
    tailwindConfig.theme?.extend ?? {};

  const classGroups: Record<string, string[]> = {};

  if (fontFamily) {
    classGroups.fontFamily = addPrefixToKeys('font', fontFamily);
  }
  if (fontSize) {
    classGroups.fontSize = addPrefixToKeys('text', fontSize);
  }
  if (aspectRatio) {
    classGroups.aspectRatio = addPrefixToKeys('aspect', aspectRatio);
  }
  if (boxShadow) {
    classGroups.boxShadow = addPrefixToKeys('shadow', boxShadow);
  }
  if (animation) {
    classGroups.animation = addPrefixToKeys('animate', animation);
  }

  return classGroups;
};

export const twMerge = extendTailwindMerge({
  classGroups: getClassGroups(),
});
