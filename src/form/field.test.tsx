import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import InputField from './input-field'
import TextareaField from './textarea-field'

describe.each([InputField, TextareaField])('field accessibility', (Field) => {
  it('associates labels and errors with unique controls', () => {
    render(
      <>
        <Field label='First' error='Required' />
        <Field label='Second' />
      </>,
    )
    const first = screen.getByLabelText('First')
    expect(first.id).not.toBe(screen.getByLabelText('Second').id)
    expect(first).toHaveAccessibleDescription('Required')
    expect(first).toHaveAttribute('aria-invalid', 'true')
  })

  it('preserves caller attributes and removes resolved errors', () => {
    const { rerender } = render(
      <>
        <p id='hint'>Hint</p>
        <Field id='custom' label='Name' error='Required' aria-describedby='hint' aria-invalid={false} />
      </>,
    )
    expect(screen.getByLabelText('Name')).toHaveAttribute('id', 'custom')
    expect(screen.getByLabelText('Name')).toHaveAccessibleDescription('Hint Required')
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'false')
    rerender(
      <>
        <p id='hint'>Hint</p>
        <Field id='custom' label='Name' aria-describedby='hint' />
      </>,
    )
    expect(screen.getByLabelText('Name')).toHaveAccessibleDescription('Hint')
    expect(screen.getByLabelText('Name')).not.toHaveAttribute('aria-invalid')
  })
})
