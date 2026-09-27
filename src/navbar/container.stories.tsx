import type { Meta, StoryObj } from '@storybook/react-vite'
import NavbarContainer from './container'

const meta: Meta<typeof NavbarContainer> = {
  title: 'Layout/NavbarContainer',
  component: NavbarContainer,
  tags: ['autodocs'],
  args: {
    children: (
      <nav className='flex items-center justify-between text-sm'>
        <span className='font-semibold text-lake-fg'>ClippingKK</span>
        <ul className='flex gap-4 text-lake-fg-muted'>
          <li>Home</li>
          <li>Books</li>
          <li>Settings</li>
        </ul>
      </nav>
    ),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'transparent', 'solid'] },
    animated: { control: 'boolean' },
  },
  decorators: [
    Story => (
      <div className='h-64 overflow-auto'>
        <Story />
        <p className='p-6 text-lake-fg-muted'>Scroll content…</p>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof NavbarContainer>

export const Default: Story = {}

export const Solid: Story = { args: { variant: 'solid' } }

export const NarrowStatic: Story = {
  args: { animated: false, innerClassName: 'max-w-3xl' },
}
