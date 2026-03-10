import * as migration_20260308_175334 from './20260308_175334';
import * as migration_20260310_142528 from './20260310_142528';

export const migrations = [
  {
    up: migration_20260308_175334.up,
    down: migration_20260308_175334.down,
    name: '20260308_175334',
  },
  {
    up: migration_20260310_142528.up,
    down: migration_20260310_142528.down,
    name: '20260310_142528'
  },
];
