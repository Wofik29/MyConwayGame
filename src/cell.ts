import {Bot} from "./bot";
import {World} from "./world";

export enum CellType {

}

export class Cell {
  public bot: Bot
  world: World
  public value: string = ' '
  xCoord: number
  yCoord: number

  constructor(world: World, x: number, y: number) {
    // this._bot = bot
    this.xCoord = x
    this.yCoord = y
    this.world = world

    this.bot = new Bot()
  }

  clone(): Cell {
    let cell = new Cell(this.world, this.xCoord, this.yCoord)
    cell.bot = this.bot.clone()

    return cell
  }

  getRight(): Cell | undefined {
    return this.world.map?.[this.xCoord + 1]?.[this.yCoord]
  }

  getLeft() {
    return this.world.map?.[this.xCoord - 1]?.[this.yCoord]
  }

  getTop() {
    return this.world.map?.[this.xCoord]?.[this.yCoord + 1]
  }

  getBottom() {
    return this.world.map?.[this.xCoord]?.[this.yCoord - 1]
  }

  getLeftTop() {
    return this.world.map?.[this.xCoord - 1]?.[this.yCoord + 1]
  }

  getRightTop() {
    return this.world.map?.[this.xCoord + 1]?.[this.yCoord - 1]
  }

  getLeftDown() {
    return this.world.map?.[this.xCoord - 1]?.[this.yCoord - 1]
  }

  getRightDown() {
    return this.world.map?.[this.xCoord + 1]?.[this.yCoord + 1]
  }

}
