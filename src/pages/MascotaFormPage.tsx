import React,{ useState, useEffect } from 'react';
import { Container, Card, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import api from "../services/api";
import type { ChoicesResponse, ApiErrorResponse } from "../types/mascota";

export const MascotaFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [choices, setChoices] = useState<ChoicesResponse | null>(null);
  const [loadingChoices, setLoadingChoices] = useState<boolean>(true);

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [estado, setEstado] = useState('perdida');
  const [tipoAnimal, setTipoAnimal] = useState('otro');
  const [edad, setEdad] = useState<number>(0);
  const [raza, setRaza] = useState('');
  const [sexo, setSexo] = useState('');
  const [tamano, setTamano] = useState('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<ApiErrorResponse | null>(null);

  const fetchChoices = async () =>{
    try {
      const response = await api.get("/choices/");
      setChoices(response.data);
    } catch (error:any) {
      console.error(error);
    }finally{
      setLoadingChoices(false);
    }
  };

  useEffect(()=>{
    fetchChoices();
  }, []);

  const handleSubmit = async (e : React.SubmitEvent) => {
    e.preventDefault();
    setApiErrors(null);
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('descripcion', descripcion);
    if (imagen) formData.append('imagen', imagen);
    formData.append('estado', estado);
    formData.append('tipo_animal', tipoAnimal);
    formData.append('edad', edad.toString());
    formData.append('raza', raza);
    formData.append('sexo', sexo);
    formData.append('tamano', tamano);

    try {
      await api.post("mascotas/", formData, {
        headers: { "Content-Type" : "multipart/form-data" }
      });
      navigate("/");
    } catch (error : any) {
      console.error(error);
      setApiErrors(error.response?.data || { general: 'Error de red al crear la mascota.' });
    }finally{
      setIsSubmitting(false);
    }
  };

  if (loadingChoices) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando formulario...</p>
      </Container>
    );
  }



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
          {apiErrors?.general && <Alert variant="danger">{apiErrors.general}</Alert>}
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="text" placeholder="Ej. Firulais" value={nombre} onChange={e=>setNombre(e.target.value)} isInvalid={!!apiErrors?.nombre} required />
                  <Form.Control.Feedback type="invalid">{apiErrors?.nombre?.join(" ")}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="tipo_animal">
                  <Form.Label>Tipo de Animal</Form.Label>
                  <Form.Select value={tipoAnimal} onChange={e=>{setTipoAnimal(e.target.value)}}>
                    {choices?.tipo_animal.map(opt =>(
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="descripcion">
                  <Form.Label>Descripción <span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    as="textarea" 
                    rows={3} 
                    value={descripcion}
                    onChange={e=>setDescripcion(e.target.value)}
                    isInvalid={!!apiErrors?.descripcion}
                    placeholder="Describe las características de la mascota o dónde se perdió/encontró" 
                    required 
                  />
                  <Form.Control.Feedback type="invalid">{apiErrors?.descripcion?.join(" ")}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group controlId="imagen">
                  <Form.Label>Imagen de la Mascota <span className="text-danger">*</span></Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                    if(e.target.files && e.target.files.length > 0){
                      setImagen(e.target.files[0]);
                    }
                  }} isInvalid={!!apiErrors?.imagen} required />
                  <Form.Control.Feedback type="invalid">{apiErrors?.imagen?.join(" ")}</Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Suba una foto clara de la mascota.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="estado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select value={estado} onChange={e=>setEstado(e.target.value)}>
                    {choices?.estado.map(opt=>(
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="edad">
                  <Form.Label>Edad (Años)</Form.Label>
                  <Form.Control type="number" min="0" placeholder="Ej. 3" value={edad} onChange={e=>
                    setEdad(Number(e.target.value))
                  } isValid={!!apiErrors?.edad} />
                  <Form.Control.Feedback type="invalid">{apiErrors?.edad?.join(" ")}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="raza">
                  <Form.Label>Raza</Form.Label>
                  <Form.Control type="text" placeholder="Ej. Golden Retriever" value={raza} onChange={e=>setRaza(e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="sexo">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select value={sexo} onChange={e=>setSexo(e.target.value)}>
                    {choices?.sexo.map(opt=>(
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="tamano">
                  <Form.Label>Tamaño</Form.Label>
                  <Form.Select value={tamano} onChange={e=>setTamano(e.target.value)}>
                    <option value="">Seleccione...</option>
                    {choices?.tamano.map(opt=>(
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <hr className="my-4" />

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" as={Link as any} to="/">
                Cancelar
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "guardando..." : "Guardar Mascota"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};