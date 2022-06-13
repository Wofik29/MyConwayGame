import {World} from "./world";
import {Web} from "./web";

const world = new World(100, 100);
world.run();
const web = new Web(world)
web.redraw()

let timeout = 500
let i = 0
function circle() {

  world.step()
  web.redraw()

  setTimeout(() => {
    console.log('step')
    circle()
  }, timeout)

}

setTimeout(() => {
  console.log('step')
  circle()
}, timeout)
