import type { Meta, StoryObj } from '@storybook/react-vite'
import Avatar from './index'

const photo = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="%2393c5fd"/><circle cx="32" cy="26" r="12" fill="%231e3a8a"/><rect x="12" y="42" width="40" height="22" rx="11" fill="%231e3a8a"/></svg>'

const meta: Meta<typeof Avatar> = {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  args: { name: 'Ada Lovelace', src: photo },
  argTypes: {
    size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'inline-radio', options: ['circle', 'rounded'] },
    ring: { control: 'inline-radio', options: ['none', 'accent', 'premium'] },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

export const Image: Story = {}

export const Initials: Story = { args: { src: null } }

export const BrokenImage: Story = { args: { src: 'https://invalid.example/avatar.png' } }

export const Sizes: Story = {
  render: () => (
    <div className='flex items-end gap-3'>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => <Avatar key={size} name='Grace Hopper' size={size} />)}
    </div>
  ),
}

export const Rings: Story = {
  render: () => (
    <div className='flex items-center gap-6 p-2'>
      <Avatar name='Reader' src={photo} ring='accent' size='lg' />
      <Avatar name='Premium Reader' src={photo} ring='premium' size='lg' />
      <Avatar name='Premium Reader' ring='premium' shape='rounded' size='lg' />
    </div>
  ),
}
