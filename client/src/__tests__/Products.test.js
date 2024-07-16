import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { MemoryRouter } from 'react-router-dom';
import Products from '../pages/Product/Products';

jest.mock('axios');
jest.mock('react-query');

describe('Products', () => {
  it('fetches and displays data correctly', async () => {
    const mockData = [
      {
        id: 1,
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        category: "men's clothing",
        description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        image: 'mock-user-01.png',
        rating: { rate: 3.9, count: 120 },
      },
    ];

    axios.get.mockResolvedValue({ data: mockData });

    useQuery.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <Products searchQuery="backpack" />
      </MemoryRouter>
    );

    expect(screen.getByText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops')).toBeInTheDocument();
  });

  it('displays loading state', () => {
    useQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <MemoryRouter>
        <Products searchQuery="backpack" />
      </MemoryRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error state', () => {
    useQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: true,
    });

    render(
      <MemoryRouter>
        <Products searchQuery="backpack" />
      </MemoryRouter>
    );

    expect(screen.getByText('Request Failed')).toBeInTheDocument();
  });
});
