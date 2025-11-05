import { TButtonProps } from '../Button/Button';

export type TCreateButtonProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: TButtonProps['variant'];
};
