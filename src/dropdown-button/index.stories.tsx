import type { Meta, StoryObj } from '@storybook/react-vite'
import { Download } from 'lucide-react'
import DropdownButton from './index'

const meta: Meta<typeof DropdownButton> = {
  title: 'Components/DropdownButton',
  component: DropdownButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DropdownButton>

export const Default: Story = {
  render: () => (
    <div className='flex items-center justify-center p-20'>
      <DropdownButton
        onClick={() => alert('Download default')}
        onSelect={value => alert(`Selected: ${value}`)}
        options={[
          { label: 'Download 7 days', value: '7d' },
          { label: 'Download 30 days', value: '30d' },
          { label: 'Download 90 days', value: '90d' },
        ]}
      >
        Download
      </DropdownButton>
    </div>
  ),
}

export const PrimaryVariant: Story = {
  render: () => (
    <div className='flex items-center justify-center p-20'>
      <DropdownButton
        variant='primary'
        onClick={() => alert('Save')}
        onSelect={value => alert(`Selected: ${value}`)}
        options={[
          { label: 'Save as draft', value: 'draft' },
          { label: 'Save and publish', value: 'publish' },
          { label: 'Save and schedule', value: 'schedule' },
        ]}
      >
        Save
      </DropdownButton>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className='flex items-center justify-center p-20'>
      <DropdownButton
        onClick={() => alert('Download CSV')}
        onSelect={value => alert(`Selected: ${value}`)}
        options={[
          { label: 'Download CSV', value: 'csv', icon: <Download className='h-4 w-4' /> },
          { label: 'Download JSON', value: 'json', icon: <Download className='h-4 w-4' /> },
          { label: 'Download PDF', value: 'pdf', icon: <Download className='h-4 w-4' /> },
        ]}
      >
        Export
      </DropdownButton>
    </div>
  ),
}

export const WithDisabledOptions: Story = {
  render: () => (
    <div className='flex items-center justify-center p-20'>
      <DropdownButton
        onClick={() => alert('Default action')}
        onSelect={value => alert(`Selected: ${value}`)}
        options={[
          { label: 'Option A', value: 'a' },
          { label: 'Option B (disabled)', value: 'b', disabled: true },
          { label: 'Option C', value: 'c' },
        ]}
      >
        Actions
      </DropdownButton>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className='flex items-center justify-center p-20'>
      <DropdownButton
        disabled
        onClick={() => alert('Should not fire')}
        onSelect={() => alert('Should not fire')}
        options={[
          { label: 'Option 1', value: '1' },
        ]}
      >
        Disabled
      </DropdownButton>
    </div>
  ),
}
