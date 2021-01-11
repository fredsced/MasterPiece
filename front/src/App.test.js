import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('control title in page', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText('myCompliancePal');
  expect(linkElement).toBeInTheDocument();
});
