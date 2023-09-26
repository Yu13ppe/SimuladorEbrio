import React, { useState } from "react";
import '../style/simuladorEbrio.css';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button
} from "reactstrap";

const SimuladorEbrio = () => {
  const [numSimulaciones, setNumSimulaciones] = useState(1);
  const [resultado, setResultado] = useState('Probabilidad:');
  const [ebrios, setEbrios] = useState([]);
  const [showGrid, setShowGrid] = useState(true);

  const validarYsimular = () => {
    const numSimulacionesInt = parseInt(numSimulaciones);

    if (numSimulacionesInt >= 1 && numSimulacionesInt <= 1000) {
      simular(numSimulacionesInt);
    } else {
      alert('El número de simulaciones debe estar entre 1 y 1000.');
    }
  }

  const simular = async (numSimulaciones) => {
    let count = 0;
    const map = document.getElementById('map');

    const start = document.createElement('div');
    start.className = 'start';
    map.appendChild(start);

    setResultado('Procesando resultado...');
    setEbrios([]); // Limpiar puntos ebrios

    for (let i = 0; i < numSimulaciones; i++) {
      let x = 0;
      let y = 0;

      for (let j = 0; j < 10; j++) {
        const direccion = Math.floor(Math.random() * 4);
        switch (direccion) {
          case 0:
            y++;
            break;
          case 1:
            y--;
            break;
          case 2:
            x++;
            break;
          case 3:
            x--;
            break;
          default:
            break;
        }
        await sleep(0);
        const nuevaPosicion = { x, y };
        setEbrios(prevEbrios => [...prevEbrios, nuevaPosicion]); // Agregar la nueva posición
      }

      if (Math.abs(x) + Math.abs(y) === 2) {
        count++;
      }
    }

    const probabilidad = (count / numSimulaciones * 100).toFixed(2);
    setResultado(`Probabilidad: ${probabilidad}%`);
  }

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  }

  const mapStyle = {
    width: '400px',
    height: '400px',
    border: '1px solid #ccc',
    position: 'relative',
    margin: '0 auto',
  };

  const gridLineStyle = {
    position: 'absolute',
    pointerEvents: 'none',
  };

  const ebrioStyle = {
    width: '15px',
    height: '15px',
    backgroundColor: 'purple',
    borderRadius: '50%',
    position: 'absolute',
  };

  const startStyle = {
    width: '15px',
    height: '15px',
    backgroundColor: 'green',
    borderRadius: '50%',
    position: 'absolute',
    left: '190px',
    top: '190px',
  };

  const renderGrid = () => {
    const gridLines = [];

    for (let i = 0; i < 20; i++) {
      gridLines.push(
        <div
          key={`horizontal-${i}`}
          className="grid-line"
          style={{
            ...gridLineStyle,
            top: `${i * 20}px`,
            left: '0',
            width: '400px',
            height: '1px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        ></div>
      );

      gridLines.push(
        <div
          key={`vertical-${i}`}
          className="grid-line"
          style={{
            ...gridLineStyle,
            top: '0',
            left: `${i * 20}px`,
            width: '1px',
            height: '400px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}
        ></div>
      );
    }

    return gridLines;
  };

  return (
    <div>
      <Card
        style={{
          width: '25%',
          margin: 'auto',
        }}
      >

        <CardHeader
          style={{
            margin: '2em'
          }}
        >
          <img style={{float: 'right', width:'100px'}} src="https://zuwebfest.com/wp-content/uploads/2021/12/urbe-zuwebfest-stand-400x400.jpg" alt="Logo de la Universidad" id="logo" />
          <h1>Simulador del Ebrio</h1>
          <div className="form-group">
            <label htmlFor="numSimulaciones">Número de simulaciones:</label>
            <input
              type="number"
              id="numSimulaciones"
              className="form-control"
              min="1"
              max="10"
              value={numSimulaciones}
              onChange={(e) => setNumSimulaciones(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardBody>
          <div id="map" style={mapStyle}>
            {showGrid && renderGrid()}
            {ebrios.map((posicion, index) => (
              <div
                key={index}
                className="ebrio"
                style={{
                  ...ebrioStyle,
                  left: `${190 + posicion.x * 20}px`,
                  top: `${190 - posicion.y * 20}px`,
                }}
              ></div>
            ))}
            <div className="street" style={{ left: '15px', top: '0' }}></div>
            <div className="street" style={{ left: '15px', bottom: '0' }}></div>
            <div className="street" style={{ top: '15px', left: '0', transform: 'rotate(90deg)' }}></div>
            <div className="street" style={{ top: '15px', right: '0', transform: 'rotate(90deg)' }}></div>
            <div className="start" style={startStyle}></div>
          </div>
        </CardBody>
        <CardFooter>
          <Button color="success"  onClick={validarYsimular}>
            Simular
          </Button>
          <Button color="warning" onClick={toggleGrid}>
            {showGrid ? 'Ocultar Cuadrícula' : 'Mostrar Cuadrícula'}
          </Button>
          <p className="mt-3" id="resultado">
            {resultado}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SimuladorEbrio;
