import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useContacts } from '../../contexts/ContactsProvider'
import { useConversations } from '../../contexts/ConversationsProvider'

const NewConversationModal = ({ handleCloseModal }) => {
  const { contacts } = useContacts()
  const { createConversation } = useConversations()
  const [selectedContactIds, setSelectedContactIds] = useState([])

  const handleChangeCheckbox = (contactId) => {
    setSelectedContactIds(prev => {
      if (prev.includes(contactId)) {
        return prev.filter(id => id !== contactId)
      } else {
        return [...prev, contactId]
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    createConversation(selectedContactIds)
    handleCloseModal()
  }


  return (
    <>
      <Modal.Header closeButton={handleCloseModal}>Create Conversation</Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {contacts.map(contact => (
            <Form.Group controlId={contact.id} key={contact.id}>
              <Form.Check
                type="checkbox"
                label={contact.name}
                value={selectedContactIds.includes(contact.id)}
                onChange={() => handleChangeCheckbox(contact.id)}
              />
            </Form.Group>
          ))}
          <Button type="submit">Create</Button>
        </Form>
      </Modal.Body>
    </>
  )
}

export default NewConversationModal
