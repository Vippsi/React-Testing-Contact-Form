import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from './ContactForm'
import axios from "axios";
import { rest } from 'msw'
import { setupServer } from 'msw/node'



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

    // 

    
})



const server = setupServer(
    rest.get('https://reqres.in/api/users', (req, res, ctx) => {
        return res(ctx.json({firstName: 'jonathan', lastName: 'thornton', email:'jonathan@jonathan.com', message:'Hello this is a message' }))
    })

)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('test server', async () => {
    server.use(
        rest.get('https://reqres.in/api/users', (req, res, ctx) => {
            return(ctx.status(500))
        })
    )
    render(<ContactForm/>)

    await waitFor(() => {
        screen.findByDisplayValue(/data/i)
    })
})