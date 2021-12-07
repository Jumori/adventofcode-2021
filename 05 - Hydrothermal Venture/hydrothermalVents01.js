/**
 * --- Day 5: Hydrothermal Venture ---
 *
 * --- Part One ---
 *
 * You come across a field of hydrothermal vents on the ocean floor! These vents
 * constantly produce large, opaque clouds, so it would be best to avoid them
 * if possible.
 *
 * They tend to form in lines; the submarine helpfully produces a list of nearby
 * lines of vents (your puzzle input) for you to review. For example:
 *
 * 0,9 -> 5,9
 * 8,0 -> 0,8
 * 9,4 -> 3,4
 * 2,2 -> 2,1
 * 7,0 -> 7,4
 * 6,4 -> 2,0
 * 0,9 -> 2,9
 * 3,4 -> 1,4
 * 0,0 -> 8,8
 * 5,5 -> 8,2
 *
 * Each line of vents is given as a line segment in the format x1,y1 -> x2,y2
 * where x1,y1 are the coordinates of one end the line segment and x2,y2 are the
 * coordinates of the other end. These line segments include the points at
 * both ends. In other words:
 *
 * An entry like 1,1 -> 1,3 covers points 1,1, 1,2, and 1,3.
 * An entry like 9,7 -> 7,7 covers points 9,7, 8,7, and 7,7.
 * For now, only consider horizontal and vertical lines: lines where either
 * x1 = x2 or y1 = y2.
 *
 * So, the horizontal and vertical lines from the above list would produce the
 * following diagram:
 *
 * .......1..
 * ..1....1..
 * ..1....1..
 * .......1..
 * .112111211
 * ..........
 * ..........
 * ..........
 * ..........
 * 222111....
 *
 * In this diagram, the top left corner is 0,0 and the bottom right corner is
 * 9,9. Each position is shown as the number of lines which cover that point
 * or . if no line covers that point. The top-left pair of 1s, for example,
 * comes from 2,2 -> 2,1; the very bottom row is formed by the overlapping
 * lines 0,9 -> 5,9 and 0,9 -> 2,9.
 *
 * To avoid the most dangerous areas, you need to determine the number of points
 * where at least two lines overlap. In the above example, this is anywhere in
 * the diagram with a 2 or larger - a total of 5 points.\
 *
 * Consider only horizontal and vertical lines. At how many points do at least
 * two lines overlap?
 *
 */

const externalInput = require('./linesOfVents.json')

// const puzzleInput = [
//   [
//     [0, 9],
//     [5, 9]
//   ],
//   [
//     [8, 0],
//     [0, 8]
//   ],
//   [
//     [9, 4],
//     [3, 4]
//   ],
//   [
//     [2, 2],
//     [2, 1]
//   ],
//   [
//     [7, 0],
//     [7, 4]
//   ],
//   [
//     [6, 4],
//     [2, 0]
//   ],
//   [
//     [0, 9],
//     [2, 9]
//   ],
//   [
//     [3, 4],
//     [1, 4]
//   ],
//   [
//     [0, 0],
//     [8, 8]
//   ],
//   [
//     [5, 5],
//     [8, 2]
//   ]
// ]

const getMinMaxOf2DIndex = (arr, idx) => {
  return {
    min: Math.min.apply(null, arr.map(line => line.map(e => e[idx])).flat()),
    max: Math.max.apply(null, arr.map(line => line.map(e => e[idx])).flat())
  }
}

const createCartesianPlane = (x, y) => {
  return {
    cartesianPlane: Array.from(Array(y + 1), () =>
      Array.from(Array(x + 1), () => 0)
    ),
    x: x,
    y: y
  }
}

const getLinesPositions = lines => {
  const { max: maxY } = getMinMaxOf2DIndex(lines, 0)
  const { max: maxX } = getMinMaxOf2DIndex(lines, 1)
  const { cartesianPlane } = createCartesianPlane(maxX, maxY)

  lines.forEach(line => {
    // console.log('--- Begging new line ---')
    const [[startX, startY], [endX, endY]] = line
    // console.log(`X: ${startX} - ${endX}`)
    // console.log(`Y: ${startY} - ${endY}`)

    // Access point in cartesian plane but only if it's a line
    if (startX === endX) {
      const lowerPoint = Math.min.apply(0, [startY, endY])
      const higherPoint = Math.max.apply(0, [startY, endY])
      for (let point = lowerPoint; point <= higherPoint; point++) {
        cartesianPlane[point][startX] += 1
      }
    }
    if (startY === endY) {
      const lowerPoint = Math.min.apply(0, [startX, endX])
      const higherPoint = Math.max.apply(0, [startX, endX])
      for (let point = lowerPoint; point <= higherPoint; point++) {
        cartesianPlane[startY][point] += 1
      }
    }
  })

  const colOverlapSum = cartesianPlane.reduce((rowAcc, row) => {
    const colOverlapSum = row.reduce((colAcc, col) => {
      if (col >= 2) return (colAcc += 1)
      return colAcc
    }, 0)
    return (rowAcc += colOverlapSum)
  }, 0)

  // console.table(cartesianPlane)
  return colOverlapSum
}

console.log(
  `Number of points where at least two lines overlap: ${getLinesPositions(
    externalInput
  )}`
)
