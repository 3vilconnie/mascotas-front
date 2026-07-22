import React from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MascotaFormPage: React.FC = () => {
  return (
    <Container className="py-2" style={{ maxWidth: '800px' }}>
      <Button variant="outline-secondary" as={Link as any} to="/" className="mb-3">
        ← Volver
      </Button>

      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white">
          <h3 className="h5 mb-0">🐾 Registrar Nueva Mascota</h3>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" placeholder="Ej. Firulais" required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="tipo_animal">
                  <Form.Label>Tipo de Animal</Form.Label>
                  <Form.Select>
                    <option value="otro">Otro</option>
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="ave">Ave</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="descripcion">
                  <Form.Label>Descripción <span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    placeholder="Describe las características de la mascota o dónde se perdió/encontró" 
                    required 
                  />
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="imagen">
                  <Form.Label>Imagen de la Mascota <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="file" accept="image/*" required />
                  <Form.Text className="text-muted">
                    Suba una foto clara de la mascota.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="estado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select defaultValue="perdida">
                    <option value="perdida">Perdida</option>
                    <option value="encontrada">Encontrada</option>
                    <option value="en_adopcion">En adopción</option>
                    <option value="adoptada">Adoptada</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="edad">
                  <Form.Label>Edad (Años)</Form.Label>
                  <Form.Control type="number" min="0" placeholder="Ej. 3" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="raza">
                  <Form.Label>Raza</Form.Label>
                  <Form.Control type="text" placeholder="Ej. Golden Retriever" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="sexo">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select>
                    <option value="desconocido">Desconocido</option>
                    <option value="macho">Macho</option>
                    <option value="hembra">Hembra</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="tamano">
                  <Form.Label>Tamaño</Form.Label>
                  <Form.Select>
                    <option value="desconocido">Desconocido</option>
                    <option value="pequeno">Pequeño</option>
                    <option value="mediano">Mediano</option>
                    <option value="grande">Grande</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <hr className="my-4" />

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" as={Link as any} to="/">
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar Mascota
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};