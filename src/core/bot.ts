import {Cell} from "./cell";
import {GENOME, getGenesNames} from "./genome";

export const MAX_GENOM = 32
export const MAX_HEALTH = 100
export const MAX_ENERGY = 100

export enum BotStates {
  NONE,
  DEATH,
  ALIVE
}

export enum BotMale {
  MALE,
  FEMALE
}

type GenomeType = String[]

export class Bot {
  cell: Cell
  state: BotStates = BotStates.NONE
  male: BotMale = BotMale.MALE // Пока не для чего
  health: number = 100
  energy: number = 100
  mineral: number = 0
  age: number = 0
  direction: number = 5
  genome: GenomeType = []
  pointer: number = 0
  lastActions: string[] = [];

  constructor(cell: Cell) {
    this.cell = cell
    for (let i = 0; i < MAX_GENOM; i++) {
      this.genome[i] = getGenesNames()[0]
    }

    for (let i = 0; i < 5; i++) {
      this.genome[Math.random() * MAX_GENOM] = getGenesNames()[1];
    }
  }

  step() {
    this.lastActions = []
    let genomeName = this.genome[this.pointer]
    let genome = GENOME[genomeName]
    const result = genome.action(this, {option: 0, branches: [0, 0]});
    this.lastActions.push(result.msg || genome.name)


  }

  isAlive(): boolean {
    return this.state == BotStates.ALIVE
  }

  clone(): Bot {
    let bot = new Bot(this.cell)
    bot = Object.assign(bot, this as Bot)
    return bot;
  }
}
