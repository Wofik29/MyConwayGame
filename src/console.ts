import {World} from "./core/world";

const world = new World(100, 100);
world.run();

let i = 0
function circle() {

  world.step()

  if (i++ < 5)
    setTimeout(() => {
      console.log('step')
      circle()
    }, 500)

}

setTimeout(() => {
  console.log('step')
  circle()
}, 500)
