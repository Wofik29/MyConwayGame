import {Cell, Coords} from "./cell";
import {BotStates} from "./bot";

export type WorldInfo = {
  cycle: number;
  dynamicBlocks: number;
  stepTime: number;
};

export enum DirectionNames {
  TOP,
  DOWN,
  LEFT,
  RIGHT,
  LEFT_TOP,
  LEFT_DOWN,
  RIGHT_TOP,
  RIGHT_DOWN
}

export class World {

  static readonly Directions: Coords[] = [
    [0, -1],
    [0, 1],
    [-1, 0],
    [+1, 0],
    [-1, -1],
    [-1, +1],
    [+1, -1],
    [+1, +1]
  ]

  width: number;
  height: number;
  info: WorldInfo = {
    cycle: 0,
    dynamicBlocks: 0,
    stepTime: 0
  };


  map: Cell[][];

  constructor(width: number, height: number) {
    this.width = width
    this.height = height

    this.map = []

  }

  run() {
    for (let i = 0; i < this.width; i++) {
      this.map[i] = []
      for (let j = 0; j < this.height; j++) {
        this.map[i][j] = new Cell(this, [i,j])
      }
    }
    this.generateAdam()
  }

  step() {
    const start = performance.now();

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        let cell = this.map[x][y]
        cell.step()
      }
    }
    this.info.cycle++
    this.info.stepTime = Math.round(performance.now() - start);
  }

  generateAdam() {

    for (let i = 0; i < 7000; i++) {
      let x = Math.round(Math.random() * (this.width - 1));
      let y = Math.round(Math.random() * (this.height - 1));

      this.map[x][y].bot.state = BotStates.ALIVE
    }
  }
}
