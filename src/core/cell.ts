import {Bot} from "./bot";
import {DirectionNames, World} from "./world";

export enum CellType {

}

// const NORMAL_ENERGY = 50


export type Coords = [number, number];
// export class Coords {
//   x: number
//   y: number
//   energy: number = 25
//
// constructor(x: number, y: number) {
//   this.x = x
//   this.y = y
// }
// }

export class Cell {
  public bot: Bot
  world: World
  transparency: number = 1
  public value: string = ' '
  coords: Coords

  constructor(world: World, coords: Coords) {
    // this._bot = bot
    this.coords = [coords[0], coords[1]]
    this.world = world

    this.bot = new Bot(this as Cell)
  }

  step() {
    this.bot.step()
  }

  clone(): Cell {
    let cell = new Cell(this.world, this.coords)
    cell.bot = this.bot.clone()

    return cell
  }

  getByDirection(direction: Coords) {
    // const direction = Directions[directionName] as number[]
    return this.world.map?.[this.coords[0] + direction[0]]?.[this.coords[1] + direction[1]];
  }

  getRight(): Cell | undefined {
    let coords = World.Directions[DirectionNames.RIGHT]
    return this.getByDirection(coords)
  }

  getLeft() {
    let coords = World.Directions[DirectionNames.LEFT]
    return this.getByDirection(coords)
  }

  getTop() {
    let coords = World.Directions[DirectionNames.TOP]
    return this.getByDirection(coords)
  }

  getDown() {
    let coords = World.Directions[DirectionNames.DOWN]
    return this.getByDirection(coords)
  }

  getLeftTop() {
    let coords = World.Directions[DirectionNames.LEFT_TOP]
    return this.getByDirection(coords)
  }

  getRightTop() {
    let coords = World.Directions[DirectionNames.RIGHT_TOP]
    return this.getByDirection(coords)
  }

  getLeftDown() {
    let coords = World.Directions[DirectionNames.LEFT_DOWN]
    return this.getByDirection(coords)
  }

  getRightDown() {
    let coords = World.Directions[DirectionNames.RIGHT_DOWN]
    return this.getByDirection(coords)
  }

}
