import React, {useState } from 'react'
import { useCallback } from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'
import { useConversations } from '../../contexts/ConversationsProvider'

const OpenConversation = () => {
  const { sendMessage, selectedConversation } = useConversations()
  const [text, setText] = useState('')

  const handleChangeText = ({ target: { value } }) => setText(value)

  const setRef = useCallback(node => {
    if (node) {
      node.scrollIntoView({ smooth: true })
    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(selectedConversation.recipients.map(r => r.id), text)
    setText('')
  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation?.messages?.map((message, i) => {
            const lastMessage = selectedConversation.messages.length - 1 === i
            return (
              <div
                className={`m-1 d-flex flex-column ${message.fromMe ? 'align-self-end' : ''}`}
                key={i}
                ref={lastMessage ? setRef : null}
              >
                <div className={`rounded px-2 py-1 ${message.fromMe ? 'bg-primary text-white' : 'border'}`}>{message.text}</div>
                <div className={`text-muted small ${message.fromMe ? 'text-right' : ''}`}>{message.fromMe ? 'You' : message.sendName}</div>
              </div>
            )
          })}
        </div>
      </div>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control as='textarea'
              required
              value={text}
              onChange={handleChangeText}
              style={{ height: '75px', resize: 'none' }}
            />

            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div >
  )
}

export default OpenConversation
