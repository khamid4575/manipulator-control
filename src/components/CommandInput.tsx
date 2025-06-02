import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Button, TextField, Snackbar, Alert, Slider } from '@mui/material';
import { addCommand } from '../store/commandsSlice';
import { optimizeCommands } from '../utils/optimizeCommands';

type CommandForm = {
  command: string;
};

interface CommandInputProps {
  setCommands: (commands: string) => void;
  setSpeed: (speed: number) => void;
  position: { x: number; y: number };
  samples: { x: number; y: number }[];
}

export const CommandInput = ({
  setCommands,
  setSpeed,
  position,
  samples,
}: CommandInputProps) => {
  const { register, handleSubmit, reset } = useForm<CommandForm>();
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [localSpeed, setLocalSpeed] = useState<number>(500);
  const [holdingSample, setHoldingSample] = useState<boolean>(false);

  const simulateCommands = (
    initialPosition: { x: number; y: number },
    initialSamples: { x: number; y: number }[],
    commands: string
  ) => {
    let pos = { ...initialPosition };
    let samps = [...initialSamples];
    let isHolding = holdingSample;

    for (const cmd of commands) {
      switch (cmd) {
        case 'Л':
          pos.x = Math.max(pos.x - 1, 0);
          break;
        case 'П':
          pos.x = Math.min(pos.x + 1, 4);
          break;
        case 'В':
          pos.y = Math.max(pos.y + 1, 0);
          break;
        case 'Н':
          pos.y = Math.min(pos.y - 1, 4);
          break;
        case 'О':
          if (!isHolding) {
            const sampleIndex = samps.findIndex((s) => s.x === pos.x && s.y === pos.y);
            if (sampleIndex !== -1) {
              samps.splice(sampleIndex, 1);
              isHolding = true;
            }
          }
          break;
        case 'Б':
          if (isHolding) {
            samps.push({ x: pos.x, y: pos.y });
            isHolding = false;
          }
          break;
        default:
          break;
      }
    }

    return { finalPosition: pos, finalSamples: samps, finalHolding: isHolding };
  };

  const onSubmit: SubmitHandler<CommandForm> = (data) => {
    const optimized = optimizeCommands(data.command);
    const samplesBefore = [...samples];
    const { finalSamples, finalHolding } = simulateCommands(position, samples, data.command);
    const now = new Date();

    dispatch(
      addCommand({
        original: data.command,
        optimized,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        samplesBefore,
        samplesAfter: finalSamples,
      })
    );

    setCommands(data.command);
    setSpeed(localSpeed);
    setHoldingSample(finalHolding);
    setOpen(true);
    reset();
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Введите команды (Л, П, В, Н, О, Б)"
          {...register('command', { required: 'Требуется ввод команды' })}
          fullWidth
          margin="normal"
        />
        <Slider
          value={localSpeed}
          onChange={(_, value) => setLocalSpeed(value as number)}
          min={100}
          max={1000}
          step={100}
          valueLabelDisplay="auto"
          aria-label="Скорость анимации"
        />
        <Button type="submit" variant="contained" color="primary">
          Отправить
        </Button>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Команда выполнена успешно!
        </Alert>
      </Snackbar>
    </>
  );
};