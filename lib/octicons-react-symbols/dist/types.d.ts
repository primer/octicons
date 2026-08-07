import { ComponentPropsWithoutRef, ReactElement } from "react";

//#region src/types.d.ts
type OcticonReferenceProps = ComponentPropsWithoutRef<'svg'> & {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  className?: string;
  fill?: string;
  id?: string;
  size?: number | 'small' | 'medium' | 'large';
  tabIndex?: number;
  title?: string | ReactElement<unknown>;
};
//#endregion
export { OcticonReferenceProps };