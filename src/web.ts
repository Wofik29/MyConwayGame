import {World} from "./world";
import {BotStates} from "./bot";


export class Web {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D
  protected paint: boolean = true
  protected world: World
  protected height: number = 1000
  protected width: number = 1000
  protected cellSize: number = 10;

  protected stepTime: HTMLSpanElement
  protected worldCycle: HTMLSpanElement

  constructor(world: World) {
    let canvas = document.getElementById('world') as HTMLCanvasElement;
    this.stepTime = document.getElementById('stepTime') as HTMLSpanElement;
    this.worldCycle = document.getElementById('worldCycle') as HTMLSpanElement;

    //
    let context = canvas!.getContext("2d")
    canvas.height = this.height
    canvas.width = this.width

    this.cellSize = Math.round(this.height / world.height);
    console.log('web')
    console.log(this.cellSize  )

    context!.lineCap = 'round'
    context!.lineJoin = 'round'
    context!.strokeStyle = 'black'
    context!.lineWidth = 1;
    context!.imageSmoothingEnabled = false;

    this.canvas = canvas
    this.context = context ?? new CanvasRenderingContext2D()
    this.world = world
  }

  toImage(): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = this.world.width;
    canvas.height = this.world.height;

    const ctx = canvas.getContext("2d");
    if (ctx instanceof CanvasRenderingContext2D) {
      const data = ctx.createImageData(this.world.width, this.world.height);
      for (let x = 0; x < this.world.width; x++) {
        for (let y = 0; y < this.world.height; y++) {
          const cell = this.world.map[x][y]
          if (cell) {

            // двумерная картинка это плоский массив пикселей, последовательность из 4х - состовляющие одного пикселя
            // Поэтому делаем смещение на 4 каждый раз
            const POINTER = (x * this.world.height + y) * 4;
            data.data[POINTER] = 0 // red
            data.data[POINTER + 1] = cell.bot?.state == BotStates.ALIVE ? 250 : 0 // green;
            data.data[POINTER + 2] = 0// blue;
            data.data[POINTER + 3] = 255 // alpha;
          }
        }
      }
      ctx.putImageData(data, 0, 0);

      return canvas;
    } else {
      throw "Не удалось получить контекст из канваса";
    }
  }

  drawGrid() {
    const canvas = this.toImage()
    this.context.drawImage(canvas, 0,0, this.width, this.height)
  }

  redraw() {
    this.stepTime.innerText = String(this.world.info.stepTime) + ' msec'
    this.worldCycle.innerText = String(this.world.info.cycle)
    this.drawGrid()
  }
}
