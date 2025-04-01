import { render, cleanup } from '@testing-library/react';
import { fireEvent, screen } from '@testing-library/dom';
import TodoCard from './index.tsx';
import '@testing-library/jest-dom';

jest.mock('uuid', () => ({ v4: () => 'unique-id' }));
describe('TodoCard', () => {
    afterEach(() => {
        cleanup();
        localStorage.clear();
    });

    it('должен отображать заголовок и поле ввода', () => {
        render(<TodoCard language="en" currentDate="2025-04-01" />);

        expect(screen.getByText('TO-DO: Time to work, my Lord!')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Time to write a task, My Lord...')).toBeInTheDocument();
    });

    it('должен добавлять задачу при нажатии кнопки "Add"', () => {
        render(<TodoCard language="en" currentDate="2025-04-01" />);

        const input = screen.getByPlaceholderText('Time to write a task, My Lord...');
        const button = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'Test Task' } });
        fireEvent.click(button);

        expect(screen.getByText('Test Task')).toBeInTheDocument();
    });

    it('должен изменять статус задачи на выполненную', () => {
        render(<TodoCard language="en" currentDate="2025-04-01" />);

        const input = screen.getByPlaceholderText('Time to write a task, My Lord...');
        const button = screen.getByText('Add');
        fireEvent.change(input, { target: { value: 'Test Task' } });
        fireEvent.click(button);

        const checkbox = screen.getByLabelText('Test Task');
        fireEvent.click(checkbox);

        expect(screen.getByText('Test Task')).toHaveClass('completed');
    });

    it('должен фильтровать задачи по статусу', () => {
        render(<TodoCard language="en" currentDate="2025-04-01" />);

        const input = screen.getByPlaceholderText('Time to write a task, My Lord...');
        const button = screen.getByText('Add');

        fireEvent.change(input, { target: { value: 'Task 1' } });
        fireEvent.click(button);

        fireEvent.change(input, { target: { value: 'Task 2' } });
        fireEvent.click(button);

        const checkbox1 = screen.getByLabelText('Task 1');
        fireEvent.click(checkbox1);

        const completedFilterButton = screen.getByText('completed');
        fireEvent.click(completedFilterButton);

        expect(screen.getByText('Task 1')).toBeInTheDocument();
    });
});
