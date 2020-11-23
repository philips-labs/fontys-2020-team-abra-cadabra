import { getByTestId, render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from 'src/components/Login';

import AccountService from 'src/services/AccountService';

jest.mock('src/services/AccountService');


describe("Login component tests", () => {

    it.only('Test if Login component renders', () => { 

        expect.assertions(3);

        const mockFn = AccountService.Login.mockImplementation(data => {
            console.log(data);
        });

        render(<Login />);

        const inputEmail = screen.getByTestId("login-input-email");
        fireEvent.change(inputEmail, { target: { value: 'test@email.com' } });
        expect(inputEmail.value).toBe("test@email.com");

        const inputPassword = screen.getByTestId("login-input-password");
        fireEvent.change(inputPassword, { target: { value: 'secretP@ssw0rd!' } });
        expect(inputPassword.value).toBe("secretP@ssw0rd!");

        const inputSubmit = screen.getByTestId("login-input-submit")
        fireEvent.click(inputSubmit);
        expect(mockFn).toHaveBeenCalledWith({ email: 'test@email.com', password: 'secretP@ssw0rd!' });
    });

});
