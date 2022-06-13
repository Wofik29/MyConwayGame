import {Cell} from "./cell";
import {BotStates} from "./bot";

export type WorldInfo = {
  cycle: number;
  dynamicBlocks: number;
  stepTime: number;
};

export class World {
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
        this.map[i][j] = new Cell(this, i, j)
      }
    }
    this.generateAdam()
  }

  step() {
    const start = performance.now();

    let map: Cell[][] = []
    for (let x = 0; x < this.width; x++) {
      map[x] = []
      for (let y = 0; y < this.height; y++) {
        let neighborAlive = 0;

        let cell = this.map[x][y]
        map[x][y] = cell.clone()

        let bot = cell.bot;
        let newBot = map[x][y].bot

        /*
        Необходимо проверять соседей по 8 направлениям
        Так же проверять границы, так же 8 сторон
         */
        let directions = ['getBottom', 'getTop', 'getRight', 'getLeft', 'getRightTop', 'getLeftTop', 'getRightDown', 'getLeftDown'];
        for (let direction in directions) {
          let value = directions[direction]
          neighborAlive += cell[value]()?.bot.isAlive() ? 1 : 0
        }

        switch (bot.state) {
          case BotStates.ALIVE:
            if (neighborAlive < 2 || neighborAlive > 3)
              newBot.state = BotStates.DEATH
            break;
          case BotStates.DEATH:
          case BotStates.NONE:
            if (neighborAlive == 3)
              newBot.state = BotStates.ALIVE
            break;
        }
      }
    }
    this.map = map;
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
