import React from 'react';
import {render} from 'react-dom';
import {cleanup, fireEvent,screen,waitFor } from '@testing-library/react';
import TodoList from './TodoList';
import assert from 'assert';


describe('toDoList test', () => {
    let container: HTMLElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        cleanup();
    })

    const renderTodoList = async () =>{
        await waitFor(() =>{
            render(<TodoList />,container)
        })
    }

    it("should show none input text and no todoList",async () =>{
        await renderTodoList();
        const tbody = container.querySelector('tbody');
        assert(tbody);
        expect(tbody.querySelectorAll('tr').length).toBe(0);
        fireEvent.change(
            container.querySelector('input') as Element,{
                target: {value: '111'}
            }
        );
        fireEvent.click(screen.getByText('ADD'),{selector: 'button'});
        await waitFor(() => {
            expect(tbody.querySelectorAll('tr').length).toBe(0);
        });


        // fireEvent.click(screen.getByRole('checkbox'),{selector: 'input'});
        // expect(screen.getByRole('checkbox')).toBeChecked;
        // await waitFor(() => {
        //     expect(tbody.querySelectorAll('tr').length).toBe(1);
        // });

    });



})