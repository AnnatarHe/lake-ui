import type { Decorator, Preview } from '@storybook/react-vite'
import './preview.css'

const themes = {
  light: { dark: false, editorial: false },
  dark: { dark: true, editorial: false },
  'editorial-light': { dark: false, editorial: true },
  'editorial-dark': { dark: true, editorial: true },
}

const withTheme: Decorator = (Story, context) => {
  const theme = themes[context.globals.theme as keyof typeof themes] ?? themes.light
  const root = document.documentElement
  root.classList.toggle('dark', theme.dark)
  if (theme.editorial) root.dataset.preset = 'editorial'
  else delete root.dataset.preset
  return Story()
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Token theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'editorial-light', title: 'Editorial light' },
          { value: 'editorial-dark', title: 'Editorial dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [withTheme],
}

export default preview
