import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "./modal.module.css";

function Example({ modal, toggle, ...args }) {
  return (
    <div>
      <Modal className={styles.modalWrapper} isOpen={modal} toggle={toggle}>
        <div className={styles.modal_content}>
          <ModalHeader className={styles.title}>Memory Recorded!</ModalHeader>
          <ModalHeader className={styles.subtitle}>Whats Next?</ModalHeader>
          <ModalBody>
            <img
              className={styles.imgg}
              width={350}
              height={350}
              src="/mascotannouncement.png"
              alt="u blind mf gain a pair of eyes"
            />
          </ModalBody>
          <ModalFooter className={styles.footer}>
            <Button
              color="secondary"
              className={styles.button1}
              onClick={() => {
                window.location.href = "/gallery";
              }}
            >
              Go to Gallery
            </Button>{" "}
            <Button
              color="primary"
              className={styles.button2}
              onClick={() => {
                window.location.href = "/echo";
              }}
            >
              Another Recall Session
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    </div>
  );
}

export default Example;
