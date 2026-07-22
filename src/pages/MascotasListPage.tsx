import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export const MascotasListPage: React.FC = () => {
    return (
        <Container className="py-2">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>Mascotas registradas</h2>
                <Button variant="primary" href="/crear">
                    + Registrar Mascota
                </Button>
            </div>

            <p className="text-muted">
                Cargando listado desde la API...
            </p>

            <Row xs={1} md={2} lg={3} className="g-4">
                <Col>
                <Card className="h-100 shadow-sm">
                    <Card.Img 
                    variant="top" 
                    src="https://via.placeholder.com/300x200" 
                    alt="Mascota de prueba"
                    />
                    <Card.Body>
                    <Card.Title>Firulais (Ejemplo)</Card.Title>
                    <Card.Text>
                        Esta es una tarjeta de ejemplo maquetada con React Bootstrap.
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer className="bg-transparent border-top-0">
                    <Button variant="outline-primary" className="w-100">
                        Ver Detalle
                    </Button>
                    </Card.Footer>
                </Card>
                </Col>
            </Row>
        </Container>
    );
};