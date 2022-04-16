import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

test('Renders home link', () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
  const divElement = screen.getByText(/Home/i)
  expect(divElement).toBeInTheDocument()
})
