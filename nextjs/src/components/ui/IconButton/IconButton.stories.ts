import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import IconButton from './IconButton';

const meta: Meta<typeof IconButton> = {
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    icon: ShoppingCartIcon,
    variant: 'secondary',
    size: 'medium',
    isLoading: false,
  },
  argTypes: {
    icon: {
      control: false,
    },
    variant: {
      control: 'select',
    },
    size: {
      control: 'select',
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconButton>;

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

export const Small: Story = {
  args: {
    size: 'small',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};
