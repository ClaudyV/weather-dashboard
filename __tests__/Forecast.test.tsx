import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Forecast from '@/components/Forecast';

describe('Forecast Component', () => {
  const mockForecast = {
    time: ['2023-10-25', '2023-10-26', '2023-10-27', '2023-10-28', '2023-10-29', '2023-10-30'],
    weather_code: [0, 1, 2, 61, 3, 95],
    temperature_2m_max: [20, 19, 18, 16, 15, 14],
    temperature_2m_min: [10, 9, 8, 7, 6, 5]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders 5-day forecast title', () => {
    render(<Forecast forecast={mockForecast} unit="celsius" />);
    
    expect(screen.getByText('5-Day Forecast')).toBeInTheDocument();
  });

  test('renders 5 days in the forecast (excluding current day)', () => {
    render(<Forecast forecast={mockForecast} unit="celsius" />);
    
    // We only show the next 5 days, not including the current day (index 0)
    // So we expect to find days from index 1-5
    const dateFormat = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    
    for (let i = 1; i <= 5; i++) {
      const date = new Date(mockForecast.time[i]);
      const formattedDate = dateFormat.format(date);
      expect(screen.getByText(formattedDate)).toBeInTheDocument();
    }
  });

  test('converts temperatures to fahrenheit when unit is fahrenheit', () => {
    render(<Forecast forecast={mockForecast} unit="fahrenheit" />);
    
    // Check if the first day's temps are converted to fahrenheit
    // 19°C max = 66.2°F, rounded to 66°F
    // 9°C min = 48.2°F, rounded to 48°F
    expect(screen.getByText(/66°F/)).toBeInTheDocument();
    expect(screen.getByText(/48°F/)).toBeInTheDocument();
  });
});