import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

export default function ModalConfirmacao(props) {
  const handleClose = () => props.setAbrir(false);
  const handleShow = () => props.setAbrir(true);

  return (
    <>
      <Modal show={props.abrir} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação de Inicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente iniciar a contagem? ao após dar inicio é obrigatorio
          fechar ao finalizar.!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Não
          </Button>
          <Button variant="primary" onClick={props.validar}>
            Sim
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
