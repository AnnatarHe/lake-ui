import type { Meta, StoryObj } from '@storybook/react'
import { addDays } from '../utils/date'
import DailyActivityChart from './index'

const meta: Meta<typeof DailyActivityChart> = {
  title: 'Components/ContributionWall',
  component: DailyActivityChart,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DailyActivityChart>

// Generate mock data for the last year
const generateMockData = (count: number) => {
  const today = new Date()
  const data = []
  
  for (let i = 0; i < 365; i++) {
    const date = addDays(today, -365 + i)
    data.push({
      date: date.getTime() / 1000,
      count: Math.floor(Math.random() * count)
    })
  }
  
  return data
}

export const Default: Story = {
  args: {
    data: generateMockData(10),
    startDate: addDays(new Date(), -365)
  }
}

export const HighActivity: Story = {
  args: {
    data: generateMockData(50),
    startDate: addDays(new Date(), -365)
  }
}

export const Empty: Story = {
  args: {
    data: [],
    startDate: addDays(new Date(), -365)
  }
}
