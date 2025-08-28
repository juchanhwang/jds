import React from 'react';

// useButton 훅에 전달될 props의 타입을 정의합니다.
type UseButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  disabled?: boolean;
  elementType?: React.ElementType;
};

// useButton 훅의 반환 타입을 정의합니다.
type UseButtonReturn = {
  buttonProps: {
    role: 'button';
    'aria-disabled': boolean;
    tabIndex?: number;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  };
};

export function useButton(props: UseButtonProps): UseButtonReturn {
  const { onClick, disabled = false, elementType = 'button' } = props;

  const buttonProps: UseButtonReturn['buttonProps'] = {
    role: 'button',
    'aria-disabled': disabled,
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      if (disabled || !onClick) {
        event.preventDefault();
        return;
      }
      onClick(event);
    },
    onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        // onClick 핸들러를 재사용합니다.
        // event 타입이 다르므로 타입 단언을 사용하거나 새로운 핸들러를 만들어 전달합니다.
        buttonProps.onClick(event as unknown as React.MouseEvent<HTMLElement>);
      }
    },
  };

  if (elementType !== 'button') {
    buttonProps.tabIndex = disabled ? -1 : 0;
  }

  return {
    buttonProps,
  };
}
