import { ComponentProps, FunctionComponent } from 'react';
import { heading } from '@/libs/styles/heading.css';

export const Title: FunctionComponent<ComponentProps<'h1'>> = (props) => (
  <h1 className={heading({ as: 'h1' })} {...props} />
);
