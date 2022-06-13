const MAX_GENOM = 32

export enum BotStates {
  NONE,
  DEATH,
  ALIVE
}

export enum BotMale {
  MALE,
  FEMALE
}

export enum GenomeType {
  PHOTOS
}

export class Bot {
  state: BotStates = BotStates.NONE
  male: BotMale = BotMale.MALE
  health: number = 900
  mineral: number = 0
  age: number = 0
  direction: number = 5
  genom: GenomeType[] = []

  constructor() {
    for (let i = 0; i< MAX_GENOM; i++) {
      this.genom[i] = GenomeType.PHOTOS
    }
  }

  isAlive(): boolean {
    return this.state == BotStates.ALIVE
  }

  clone(): Bot {
    let bot = new Bot()
    bot = Object.assign(bot, this as Bot)
    return bot;
  }
}
