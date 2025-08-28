import React from 'react';
import { useButton } from './useButton';

type ButtonOwnProps<T extends React.ElementType = 'button'> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

// Omit을 사용하여 중복되는 prop(예: onClick)을 제거하고 ButtonOwnProps의 것을 사용하도록 합니다.
type ButtonProps<T extends React.ElementType> = ButtonOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

export function Button<T extends React.ElementType = 'button'>(
  props: ButtonProps<T>,
) {
  const {
    as: Component = 'button',
    children,
    className,
    onClick,
    ...rest
  } = props;

  const { buttonProps } = useButton({
    elementType: Component,
    disabled: rest.disabled,
    onClick,
  });

  return (
    <Component className={className} {...rest} {...buttonProps}>
      {children}
    </Component>
  );
}
