/**
 * --- Day 6: Lanternfish ---
 *
 * --- Part Two ---
 *
 * Suppose the lanternfish live forever and have unlimited food and space.
 * Would they take over the entire ocean?
 *
 * After 256 days in the example above, there would be a total of
 * 26984457539 lanternfish!
 *
 * How many lanternfish would there be after 256 days?
 */

const externalInput = require('./listOfAges.json')

// const puzzleInput = [3, 4, 3, 1, 2]

const lanternfishCreation = (ages, period = 256) => {
  /**
   * We know that all lantern fish can be in one of 9-possible states,
   * which is the number of days until the reproduce
   * Ex: if wa have 100 fish in state 5, then we'll have 100 fish in state 4 at
   * the next iteration
   *
   * We can create an array with 9 positions where each position is the sum of
   * lanternfish that are in the current state
   */
  const fish = Array.from(Array(9), (_, n) =>
    ages.reduce((acc, curr) => (curr === n ? (acc += 1) : acc), 0)
  )

  /**
   * Note that each lanternfish at state 0 produces new lanternfish at state
   * 6 and another at state 8
   * Again the same logic holds: n lanternfish produce n lanternfish at state 6
   * and n lanternfish at state 8
   */
  for (let i = 0; i < period; i++) {
    fish.push(fish.shift())
    fish[6] += fish[8]
  }

  /**
   * At the end, we just need to sum each position from the fish array
   * since each position is already the sum from that state
   * Ex: position 0 value is 100, where 100 is the amount of fishlantern with state 0
   */
  return fish.reduce((acc, curr) => (acc += curr), 0)
}

console.log(`Amount of lanternfishes: ${lanternfishCreation(externalInput)}`)
