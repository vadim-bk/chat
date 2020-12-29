import React, { useRef } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'

const Login = ({ setId }) => {

  const idRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setId(idRef.current.value)
  }

  const createNewId = (params) => setId(uuidV4())

  return (
    <Container className="align-items-center d-flex" style={{ height: '100vh' }}>
      <Form className="w-100" onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Enter your ID</Form.Label>
          <Form.Control type="text" ref={idRef} required />
        </Form.Group>

        <Button type="submit" className="mr-2">Log in</Button>
        <Button variant="secondary" onClick={createNewId}>Create a new ID</Button>
      </Form>
    </Container>
  )
}

export default Login
