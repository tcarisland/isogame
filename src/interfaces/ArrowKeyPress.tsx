import KeyPress from '../interfaces/KeyPress';

interface ArrowKeyPress extends KeyPress {
  code?: number;
  dir: number;
  active: boolean;
  id: string;
}

export default ArrowKeyPress;