import React from 'react';
import Pixel from '../Pixel/Pixel';
import './PixelBoard.css';

interface PixelData {
  x: number;
  y: number;
  color: string;
  username: string;
  _id: string;
  timestamp: string;
  __v: number;
}

interface PixelBoardProps {
  rawData: Array<PixelData>;
}

const traiterDonnees = (pixels: Array<PixelData>) => {
  const tailleDuTableau = 50;
  const couleurParDefaut = "#FFFFFF"; 
  const tableau: Array<Array<string>> = Array(tailleDuTableau).fill(0).map(() => Array(tailleDuTableau).fill(couleurParDefaut));

  pixels.forEach(pixel => {
    if (pixel.x >= 0 && pixel.x < tailleDuTableau && pixel.y >= 0 && pixel.y < tailleDuTableau) {
      tableau[pixel.y][pixel.x] = pixel.color;
    }
  });

  return tableau;
}

const PixelBoard: React.FC<PixelBoardProps> = ({ rawData }) => {
  const data = traiterDonnees(rawData);

  return (
    <div className="pixel-board">
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="pixel-row">
          {row.map((color, colIndex) => (
            <Pixel key={ colIndex + "+" + rowIndex} color={color} x={colIndex} y={rowIndex} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default PixelBoard;
