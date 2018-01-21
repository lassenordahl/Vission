import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

const LoginModal = () => (
  <Modal trigger={<Button>Basic Modal</Button>} basic size='small'>
    <Header icon='archive' content='Choose a username.' />
    <Modal.Content>
      <p>Choose a username to use when chatting in Vissions.</p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted>
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted>
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
)

export default LoginModal