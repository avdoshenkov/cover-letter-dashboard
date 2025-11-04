'use client';

import { useState, useCallback } from 'react';
import { Button } from '../Button';
import { CopyIcon, CheckIcon } from '../icons';
import styles from './CopyButton.module.css';

export type TCopyButtonProps = {
  textToCopy: string;
  disabled?: boolean;
};

export const CopyButton = ({ textToCopy, disabled }: TCopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!textToCopy || typeof navigator === 'undefined') {
      return;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  }, [textToCopy]);

  return (
    <Button
      className={styles.button}
      type="button"
      onClick={handleCopy}
      variant="outline"
      size="sm"
      iconPlacement="end"
      icon={copied ? <CheckIcon /> : <CopyIcon />}
      disabled={disabled}
    >
      {copied ? 'Copied!' : 'Copy to clipboard'}
    </Button>
  );
};
