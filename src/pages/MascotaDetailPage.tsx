import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Form, ListGroup, Button } from 'react-bootstrap';

export const MascotaDetailPage: React.FC = () => {
    const { id } = useParams<{ id : string }>();

    return (
        <Container className="py-2">
            <Button variant="outline-secondary" as={Link as any} to="/" className="mb-3">
                ← Volver al listado
            </Button>
            <Row className="g-4">
                <Col md={6}>
                <Card className="shadow-sm">
                    <Card.Img 
                    variant="top" 
                    src="https://via.placeholder.com/600x400" 
                    alt="Mascota" 
                    />
                    <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <Card.Title className="h3 mb-0">Mascota #{id}</Card.Title>
                        <Badge bg="warning" text="dark">Perdida</Badge>
                    </div>
                    <Card.Text>
                        Esta es una descripción de ejemplo maquetada con React Bootstrap. Aquí se mostrará la historia o los detalles de la mascota.
                    </Card.Text>
                    
                    <ListGroup variant="flush" className="my-3">
                        <ListGroup.Item><strong>Tipo:</strong> Perro</ListGroup.Item>
                        <ListGroup.Item><strong>Raza:</strong> Golden Retriever</ListGroup.Item>
                        <ListGroup.Item><strong>Edad:</strong> 3 años</ListGroup.Item>
                        <ListGroup.Item><strong>Tamaño:</strong> Mediano</ListGroup.Item>
                        <ListGroup.Item><strong>Sexo:</strong> Macho</ListGroup.Item>
                    </ListGroup>
                    </Card.Body>
                </Card>
                </Col>

                
                <Col md={6}>
                <Card className="shadow-sm mb-4">
                    <Card.Header>
                    <h5 className="mb-0">💬 Comentarios</h5>
                    </Card.Header>
                    <Card.Body>
                    <ListGroup className="mb-4">
                        <ListGroup.Item>
                        <div className="d-flex justify-content-between">
                            <strong>Ana</strong>
                            <small className="text-muted">14/07/2026</small>
                        </div>
                        <p className="mb-0 text-secondary">¡Se parece mucho a un perro que vi en el parque!</p>
                        </ListGroup.Item>
                    </ListGroup>

                    <h6>Dejar un comentario:</h6>
                    <Form>
                        <Form.Group className="mb-2" controlId="autor">
                        <Form.Control type="text" placeholder="Tu nombre" />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="contenido">
                        <Form.Control as="textarea" rows={3} placeholder="Escribe un comentario..." />
                        </Form.Group>
                        <Button variant="primary" type="submit" size="sm">
                        Enviar Comentario
                        </Button>
                    </Form>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
        
    );

};