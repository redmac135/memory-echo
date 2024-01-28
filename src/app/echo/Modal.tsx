import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import styles from "./modal.module.css";
import Image from 'next/image';

function Example(args) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button className={styles.button} onClick={toggle}>
        Click Me
      </Button>
      <Modal className={styles.body, styles.background} isOpen={modal} toggle={toggle} {...args}>
        <div className={styles.modal_content}>
        <ModalHeader className={styles.title}>Memory Recorded!</ModalHeader>
        <ModalHeader className={styles.subtitle}>Whats Next?</ModalHeader>
        <ModalBody>
          <img className={styles.imgg} width={350} height={350} src='/mascotannouncement.png' alt='u blind mf gain a pair of eyes'/>
        </ModalBody>
        <ModalFooter>
          <Button className={styles.button1} onClick={toggle}>
            Go to Gallery
          </Button>{' '}
          <Button className={styles.button2} onClick={toggle}>
            Another Recall Session
          </Button>
        </ModalFooter>
        </div>
      </Modal>
    </div>
  );
}

export default Example;