import {World} from "./world";
import {Web} from "./web";

const world = new World(200, 200);
world.run();
const web = new Web(world)
web.redraw()

let timeout = 50
let i = 0
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
