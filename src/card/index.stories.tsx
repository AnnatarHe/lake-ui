import type { Meta, StoryObj } from '@storybook/react-vite'
import Card from './index'

const meta: Meta<typeof Card> = {
  title: 'Layout/Card',
  component: Card,
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <h2 className='text-lg font-semibold text-lake-fg'>The Remains of the Day</h2>
        <p className='mt-2 text-sm text-lake-fg-muted'>What is the point of worrying oneself too much about what one could or could not have done to control the course one’s life took?</p>
      </>
    ),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'bordered', 'elevated'] },
    padding: { control: 'inline-radio', options: ['none', 'sm', 'md', 'lg', 'xl'] },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {}

export const Bordered: Story = { args: { variant: 'bordered' } }

export const Elevated: Story = { args: { variant: 'elevated' } }

export const AsArticle: Story = {
  args: { 'as': 'article', 'aria-label': 'Highlight', 'padding': 'lg' },
}
