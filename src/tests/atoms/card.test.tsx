import { render, screen } from '@testing-library/react';
import Card from '../../atoms/Card';

describe('Card Component', () => {
    it('renders the title and body', () => {
        render(<Card title="Test Title" body="Test Body" />);
        
        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Body')).toBeInTheDocument();
    });
});
