import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn, userEvent, within, expect } from '@storybook/test';
import { Button } from './';

/**
 * 이 컴포넌트는 모든 버튼의 기본이 되는 Headless 버튼입니다.
 * `className`을 통해 스타일을 주입하여 다양한 형태로 사용할 수 있습니다.
 */
const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],

  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['button', 'a', 'div'],
      description: '버튼이 렌더링될 HTML 태그',
    },
    className: {
      description: 'Tailwind CSS 유틸리티 클래스',
    },
  },

  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const primaryClasses =
  'h-10 px-6 rounded-full bg-purple-800 text-white text-label-large inline-flex items-center justify-center transition-all hover:shadow-elevation-1 hover:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:brightness-85 active:shadow-none disabled:bg-on-surface/10 disabled:text-on-surface/40 disabled:shadow-none disabled:cursor-not-allowed cursor-pointer disabled:bg-purple-300';

const linkClasses =
  'inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:bg-white disabled:opacity-70';

export const Unstyled: Story = {
  args: {
    children: 'Unstyled Button',
  },
};

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    className: primaryClasses,
  },
};

export const Link: Story = {
  args: {
    children: 'Link Button',
    as: 'a',
    href: '#',
    className: linkClasses,
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args, // Primary의 스타일을 그대로 사용
    children: 'Disabled Button',
    disabled: true,
  },
};

export const Loading: Story = {
  render: (args) => (
    <Button {...args}>
      <svg
        className="mr-2 -ml-1 h-5 w-5 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span>처리 중...</span>
    </Button>
  ),
  args: {
    ...Primary.args,
    className: primaryClasses,
    isDisabled: true, // 로딩 중에는 비활성화
  },
};

export const ClickInteraction: Story = {
  name: 'Interaction Test (Click)',
  args: {
    ...Primary.args,
    children: 'Click me',
  },
  play: async ({ canvasElement, args }) => {
    // 캔버스(스토리 렌더링 영역)에서 요소를 찾습니다.
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /Click me/i });

    // 사용자가 버튼을 클릭하는 것을 시뮬레이션합니다.
    await userEvent.click(button);

    // `onClick` prop으로 전달된 mock 함수가 호출되었는지 확인합니다.
    await expect(args.onClick).toHaveBeenCalled();
  },
};
