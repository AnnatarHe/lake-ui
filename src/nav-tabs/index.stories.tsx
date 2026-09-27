import type { Meta, StoryObj } from '@storybook/react-vite'
import { BookOpen, Highlighter, Settings } from 'lucide-react'
import NavTabs from './index'

const meta: Meta<typeof NavTabs> = {
  title: 'Navigation/NavTabs',
  component: NavTabs,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Dashboard',
    'items': [
      { key: 'books', label: 'Books', icon: <BookOpen className='size-4' />, count: 24, active: true, render: <a href='#books' /> },
      { key: 'clips', label: 'Clippings', icon: <Highlighter className='size-4' />, count: 1280, active: false, render: <a href='#clips' /> },
      { key: 'settings', label: 'Settings', icon: <Settings className='size-4' />, active: false, render: <a href='#settings' /> },
    ],
  },
  argTypes: { variant: { control: 'inline-radio', options: ['underline', 'pill'] } },
}

export default meta
type Story = StoryObj<typeof NavTabs>

export const Underline: Story = {}

export const Pill: Story = { args: { variant: 'pill', size: 'sm' } }
