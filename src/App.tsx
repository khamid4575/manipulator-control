import { useSelector } from 'react-redux';
import { useState } from 'react';
import type { RootState } from './store/store';
import { AuthForm } from './components/AuthForm';
import { CommandInput } from './components/CommandInput';
import { GridVisualizer } from './components/GridVisualizer';
import { CommandHistory } from './components/CommandHistory';
import { Container, Typography } from '@mui/material';

export const App = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [commands, setCommands] = useState<string>('');
  const [speed, setSpeed] = useState<number>(500);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [samples, setSamples] = useState<{ x: number; y: number }[]>([{ x: 3, y: 0 }]);

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Управление манипулятором
      </Typography>
      <CommandInput
        setCommands={setCommands}
        setSpeed={setSpeed}
        position={position}
        samples={samples}
      />
      <GridVisualizer
        commands={commands}
        speed={speed}
        position={position}
        setPosition={setPosition}
        samples={samples}
        setSamples={setSamples}
      />
      <CommandHistory />
    </Container>
  );
};