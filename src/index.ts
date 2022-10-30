import {World} from "./core/world";
import {Web} from "./web";

const world = new World(50, 50);
world.run();
const web = new Web(world)
web.redraw()

let timeout = 75

function circle() {

  world.step()
  web.redraw()

  setTimeout(() => {
    circle()
  }, timeout)

}

setTimeout(() => {
  circle()
}, timeout)
