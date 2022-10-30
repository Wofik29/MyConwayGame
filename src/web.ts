import {World} from "./core/world";
import {BotStates, MAX_ENERGY} from "./core/bot";
import {ActionResult} from "./core/genome";


export class Web {
  protected canvas: HTMLCanvasElement;
  protected context: CanvasRenderingContext2D
  protected paint: boolean = true
  protected world: World
  protected height: number = 800
  protected width: number = 800
  protected cellSize: number = 10;

  protected stepTime: HTMLSpanElement
  protected worldCycle: HTMLSpanElement
  protected coordsMouse: HTMLSpanElement
  protected cellState: HTMLSpanElement
  protected lastAction: HTMLSpanElement

  protected mouseX;
  protected mouseY;

  constructor(world: World) {
    let canvas = document.getElementById('world') as HTMLCanvasElement;
    this.stepTime = document.getElementById('stepTime') as HTMLSpanElement;
    this.worldCycle = document.getElementById('worldCycle') as HTMLSpanElement;
    this.coordsMouse = document.getElementById('CoordsMouse') as HTMLSpanElement;
    this.cellState = document.getElementById('CellState') as HTMLSpanElement;
    this.lastAction = document.getElementById('LastAction') as HTMLSpanElement;

    document.onmousemove = (event) => {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    }

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
            let isAlive = cell.bot.state == BotStates.ALIVE
            let actionName = cell.bot.lastActions[0]?.actionName

            let energyColor = (255 / cell.bot.genomeParam.maxEnergy) * cell.bot.energy
            // let multiplyColor = 255 * (actionName === 'multiply')

            // двумерная картинка это плоский массив пикселей, последовательность из 4х - состовляющие одного пикселя
            // Поэтому делаем смещение на 4 каждый раз
            const POINTER = (x * this.world.height + y) * 4;
            data.data[POINTER] = 0 // red
            data.data[POINTER + 1] = isAlive && (actionName == 'photosynthesis')  ? energyColor : 0 // green;
            data.data[POINTER + 2] = isAlive && (actionName == 'multiply') ? 255 : 0// blue;
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

    let mouseCellY = Math.floor((this.mouseX - 8)  / this.cellSize)
    let mouseCellX = Math.floor((this.mouseY - 8) / this.cellSize)


    // this.world.map.get
    let isCell = this.world.map?.[mouseCellX]?.[mouseCellY]
    let statusText = 'Nothing'
    if (isCell) {
        // isCell = true;
      statusText = '<br>&ensp;Статус: ' + isCell.bot.state.toString();
      statusText += '<br>&ensp;Энергия: ' + isCell.bot.energy.toString();
      statusText += '<br>&ensp;Возраст: ' + isCell.bot.age.toString();
      let lastAction: ActionResult = isCell.bot.lastActions[isCell.bot.lastActions.length - 1];

      this.lastAction.innerText = (lastAction !== undefined && lastAction.msg !== undefined ? lastAction.msg : 'Nothing');
      this.coordsMouse.innerText = `X: ${isCell.coords[0]}, Y: ${isCell.coords[1]}`
    }

    this.cellState.innerHTML = statusText

    this.drawGrid()
  }
}
