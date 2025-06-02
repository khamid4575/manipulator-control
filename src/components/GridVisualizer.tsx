import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

interface GridVisualizerProps {
  commands: string;
  speed: number;
  position: { x: number; y: number };
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  samples: { x: number; y: number }[];
  setSamples: React.Dispatch<React.SetStateAction<{ x: number; y: number }[]>>;
}

export const GridVisualizer = ({
  commands,
  speed,
  position,
  setPosition,
  samples,
  setSamples,
}: GridVisualizerProps) => {
  const [holdingSample, setHoldingSample] = useState<boolean>(false);
  const [pendingSamples, setPendingSamples] = useState<{ x: number; y: number }[]>([...samples]);

  useEffect(() => {
    let index = 0;
    let isHolding = holdingSample;
    let tempSamples = [...pendingSamples];

    const interval = setInterval(() => {
      if (index >= commands.length) {
        setSamples(tempSamples);
        setHoldingSample(isHolding);
        clearInterval(interval);
        return;
      }

      const command = commands[index];
      setPosition((prev) => {
        let newPos = { ...prev };
        switch (command) {
          case 'Л':
            newPos.x = Math.max(prev.x - 1, 0);
            break;
          case 'П':
            newPos.x = Math.min(prev.x + 1, 4);
            break;
          case 'В':
            newPos.y = Math.max(prev.y + 1, 0);
            break;
          case 'Н':
            newPos.y = Math.min(prev.y - 1, 4);
            break;
          case 'О':
            if (!isHolding) {
              const sampleIndex = tempSamples.findIndex(
                (s) => s.x === prev.x && s.y === prev.y
              );
              if (sampleIndex !== -1) {
                tempSamples.splice(sampleIndex, 1);
                setPendingSamples([...tempSamples]);
                isHolding = true;
              }
            }
            break;
          case 'Б':
            if (isHolding) {
              tempSamples.push({ x: prev.x, y: prev.y });
              setPendingSamples([...tempSamples]);
              isHolding = false;
            }
            break;
          default:
            break;
        }
        return newPos;
      });
      index++;
    }, speed);

    return () => clearInterval(interval);
  }, [commands, speed, setPosition, setSamples]);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 50px)', gap: 1, mt: 2 }}>
      {Array.from({ length: 25 }).map((_, i) => {
        const x = i % 5;
        const y = 4 - Math.floor(i / 5);
        const isManipulator = x === position.x && y === position.y;
        const hasSample = pendingSamples.some((s) => s.x === x && s.y === y);
        return (
          <Box
            key={`${x},${y}`}
            sx={{
              width: 50,
              height: 50,
              backgroundColor: isManipulator ? 'blue' : hasSample ? 'green' : 'grey',
              border: '1px solid black',
            }}
          />
        );
      })}
    </Box>
  );
};