import {Bot, MAX_ENERGY} from "./bot";
import {World} from "./world";
import {Coords} from "./cell";

export function getGenesNames() {
  return Object.keys(GENOME)
}

export type ActionResult = { actionName: string, completed: boolean, goto: number | null, msg?: string };

export type ActionFn = (
  bot: Bot,
  options: GeneProperty
) => ActionResult;

export type GeneProperty = {
  option: number,
  branches: [number, number]
};

export type GeneTemplate = {
  name: string,
  action: ActionFn
};

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}


const PHOTOSYNTHESIS_ADD = 0.4

export const GENOME: { [index: string]: GeneTemplate } = {
  photosynthesis: {
    name: 'Фотосинтес',
    action: (bot) => {
      bot.energy += (PHOTOSYNTHESIS_ADD * bot.cell.transparency);
      if (bot.energy > bot.genomeParam.maxEnergy)
        bot.energy = bot.genomeParam.maxEnergy;
      bot.pointer++
      return { actionName: 'photosynthesis', completed: true, goto: null, msg: `Получение энергии от солнца` };
    }
  },
  multiply: {
    name: 'Разможение',
    action: (bot: Bot) => {
      bot.pointer++
      if (bot.energy <= bot.genomeParam.energyForMultiply)
        return {actionName: 'multiply', completed: false, goto: null, msg: `Мало энергии для размножения` };

      let directions = World.Directions;
      shuffle(directions);
      let isCreated = false;
      let directionStatus: Coords[] = [];

      for (let direction: Coords of directions) {
        let cell = bot.cell.getByDirection(direction)
        // console.log(direction)
        if (cell && cell.existBot() == false) {
          let newBot = bot.clone();
          newBot.age = 0
          newBot.energy = bot.genomeParam.energyForMultiply
          newBot.pointer = 0;
          bot.energy -= bot.genomeParam.energyForMultiply
          // console.log(newBot)
          cell.bot = newBot
          isCreated = true;


          break
        }
      }
      // console.log(directionStatus)

      return { actionName: 'multiply', completed: isCreated, goto: null, msg: isCreated ? `Создал потомка` : `Не удалось создать потомка` };
    }
  }
}
