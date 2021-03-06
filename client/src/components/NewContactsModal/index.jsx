import React from 'react'
import { useRef } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../../contexts/ContactsProvider'

const NewContactsModal = ({ handleCloseModal }) => {
  const { createContact } = useContacts()

  const idRef = useRef()
  const nameRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    createContact(idRef.current.value, nameRef.current.value)
    handleCloseModal()
  }

  return (
    <>
      <Modal.Header closeButton={handleCloseModal}>Create Contact</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Id</Form.Label>
            <Form.Control type="text" ref={idRef} required />
          </Form.Group>

          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>

          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewContactsModal
