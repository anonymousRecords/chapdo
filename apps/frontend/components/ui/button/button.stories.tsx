import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import { Button } from './button';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select', options: ['primary', 'secondary'] },
    },
    size: {
      control: { type: 'select', options: ['sm', 'md', 'lg'] },
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  children: '저장하기',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  children: '임시 저장하기',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  children: '저장하기',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
  children: '저장하기',
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  children: '저장하기',
};
