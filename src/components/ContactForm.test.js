import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from './ContactForm'

test('Contact Returns new "user" object', () => {
    render(<ContactForm/>)

    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)

    fireEvent.change(firstNameInput, { target: { value: 'jonathan'}})
    fireEvent.change(lastNameInput, { target: { value: 'thornton'}})
    fireEvent.change(emailInput, { target: { value: 'jonathan@jonathan.com'}})
    fireEvent.change(messageInput, { target: { value: 'Hello this is a message'}})

    const submitButton = screen.getByTestId(/submit/i)
    fireEvent.click(submitButton)

    const newUser = screen.findByDisplayValue(/data/i)
})