'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../Button';
import { PlusIcon } from '../icons';
import { TCreateButtonProps } from './CreateButton.types';

export const CreateButton = ({
  size = 'md',
  className,
  variant = 'primary'
}: TCreateButtonProps) => {
  const router = useRouter();

  const handleCreate = () => {
    router.push('/new');
  };

  return (
    <Button
      type="button"
      size={size}
      variant={variant}
      icon={<PlusIcon />}
      onClick={handleCreate}
      className={className}
    >
      Create new
    </Button>
  );
};
