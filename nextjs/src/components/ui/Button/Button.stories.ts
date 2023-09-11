import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    text: 'Button',
    variant: 'primary',
    size: 'large',
    isLoading: false,
  },
  argTypes: {
    variant: {
      control: 'select',
    },
    size: {
      control: 'select',
    },
    icon: {
      options: ['undefined', 'shopping-cart'],
      mapping: {
        undefined: undefined,
        'shopping-cart': ShoppingCartIcon,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
  },
};

export const Icon: Story = {
  args: {
    icon: ShoppingCartIcon,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    loadingText: 'Loading',
  },
};
