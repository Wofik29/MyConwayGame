import {Bot} from "./bot";

export function getGenesNames() {
  return Object.keys(GENOME)
}

export type ActionResult = { completed: boolean, goto: number | null, msg?: string };

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


const PHOTOSYNTHESIS_ADD = 0.1

export const GENOME: { [index: string]: GeneTemplate } = {
  photosynthesis: {
    name: 'Фотосинтес',
    action: (bot) => {
      bot.energy += (PHOTOSYNTHESIS_ADD * bot.cell.transparency);
      // bot.pointer++
      return { completed: true, goto: null, msg: `Получение энергии от солнца` };
    }
  },
  // multiply: {
  //   name: 'Разможение',
    // action: (bot: Bot) => {
    //
    // }
  // }
}
