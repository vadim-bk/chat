import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'

import Contacts from '../Contacts'
import Conversations from '../Conversations'
import NewContactsModal from '../NewContactsModal'
import NewConversationModal from '../NewConversationModal'

const Sidebar = ({ id }) => {
  const CONVERSATIONS_KEY = 'conversations'
  const CONTACTS_KEY = 'contacts'

  const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
  const [modalOpen, setModalOpen] = useState(false)

  const conversationsOpen = activeKey === CONVERSATIONS_KEY

  const handleOpenModal = () => setModalOpen(true)

  const handleCloseModal = () => setModalOpen(false)

  return (
    <div className="d-flex flex-column" style={{ width: "250px" }}>
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATIONS_KEY}>Conversations</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="border-right overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CONVERSATIONS_KEY}>
            <Conversations />
          </Tab.Pane>

          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>

        <div className="p-2 border-top border-right small">
          Your ID: <span className="text-muted">{id}</span>
        </div>

        <Button className='rounded-0' onClick={handleOpenModal}>
          New {conversationsOpen ? 'Conversation' : 'Contact'}
        </Button>
      </Tab.Container>

      <Modal show={modalOpen} onHide={handleCloseModal}>
        {conversationsOpen ?
          <NewConversationModal handleCloseModal={handleCloseModal} /> :
          <NewContactsModal handleCloseModal={handleCloseModal} />}
      </Modal>
    </div>
  )
}

export default Sidebar
