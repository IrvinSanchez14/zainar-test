import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchPosts } from '../../api/fetch';

vi.mock('axios');

describe('fetchPosts', () => {
  beforeEach(() => {
    import.meta.env.VITE_API_URL = 'http://mock-api-url.com';
  });

  it('should return data when API call is successful', async () => {
    const mockData = [{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }];
    (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

    const result = await fetchPosts();
    expect(result).toEqual(mockData);
  });

  it('should return an empty array when API URL is not defined', async () => {
    import.meta.env.VITE_API_URL = '';
    const result = await fetchPosts();
    expect(result).toEqual([]);
  });

  it('should return an empty array when API call fails', async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    const result = await fetchPosts();
    expect(result).toEqual([]);
  });
});
