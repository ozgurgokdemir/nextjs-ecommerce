import type { Meta, StoryObj } from '@storybook/react';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import LinkButton from './LinkButton';

const meta: Meta<typeof LinkButton> = {
  component: LinkButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    href: '',
    text: 'Link Button',
  },
  argTypes: {
    variant: {
      control: 'select',
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    size: {
      control: 'select',
      table: {
        defaultValue: {
          summary: 'large',
        },
      },
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

type Story = StoryObj<typeof LinkButton>;

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
