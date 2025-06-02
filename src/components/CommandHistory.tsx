import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import type { RootState } from '../store/store';

interface Command {
  original: string;
  optimized: string;
  date: string;
  time: string;
  samplesBefore: { x: number; y: number }[];
  samplesAfter: { x: number; y: number }[];
}

export const CommandHistory = () => {
  const commands = useSelector((state: RootState) => state.commands.history);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Исходная команда</TableCell>
          <TableCell>Оптимизированная</TableCell>
          <TableCell>Дата</TableCell>
          <TableCell>Время</TableCell>
          <TableCell>Oбразцов до</TableCell>
          <TableCell>Oбразцов после</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {commands.map((cmd: Command, index: number) => (
          <TableRow key={index}>
            <TableCell>{cmd.original}</TableCell>
            <TableCell>{cmd.optimized}</TableCell>
            <TableCell>{cmd.date}</TableCell>
            <TableCell>{cmd.time}</TableCell>
            <TableCell>{cmd.samplesBefore.map((s) => `(${s.x},${s.y})`).join(', ')}</TableCell>
            <TableCell>{cmd.samplesAfter.map((s) => `(${s.x},${s.y})`).join(', ')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};