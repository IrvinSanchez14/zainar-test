import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Button from '../../atoms/Button';

describe('Button Component', () => {
    it('renders with the correct title', () => {
        render(<Button handleSendMessage={() => {}} title="Send" />);
        expect(screen.getByText('Send')).toBeInTheDocument();
    });

    it('calls handleSendMessage when clicked', () => {
        const handleSendMessage = vi.fn();
        render(<Button handleSendMessage={handleSendMessage} title="Send" />);
        fireEvent.click(screen.getByText('Send'));
        expect(handleSendMessage).toHaveBeenCalledTimes(1);
    });

    it('is memoized and does not re-render unnecessarily', () => {
        const handleSendMessage = vi.fn();
        const { rerender } = render(<Button handleSendMessage={handleSendMessage} title="Send" />);
        rerender(<Button handleSendMessage={handleSendMessage} title="Send" />);
        expect(handleSendMessage).toHaveBeenCalledTimes(0);
    });
});
