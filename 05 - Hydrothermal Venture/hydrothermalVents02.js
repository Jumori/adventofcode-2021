/**
 * --- Day 5: Hydrothermal Venture ---
 *
 * --- Part Two ---
 *
 * Unfortunately, considering only horizontal and vertical lines doesn't give
 * you the full picture; you need to also consider diagonal lines.
 *
 * Because of the limits of the hydrothermal vent mapping system, the lines in
 * your list will only ever be horizontal, vertical, or a diagonal line at
 * exactly 45 degrees. In other words:
 *
 * An entry like 1,1 -> 3,3 covers points 1,1, 2,2, and 3,3.
 * An entry like 9,7 -> 7,9 covers points 9,7, 8,8, and 7,9.
 * Considering all lines from the above example would now produce the following
 * diagram:
 *
 *
 * 1.1....11.
 * .111...2..
 * ..2.1.111.
 * ...1.2.2..
 * .112313211
 * ...1.2....
 * ..1...1...
 * .1.....1..
 * 1.......1.
 * 222111....
 *
 * You still need to determine the number of points where at least two lines
 * overlap. In the above example, this is still anywhere in the diagram with a
 * 2 or larger - now a total of 12 points.
 *
 * Consider all of the lines. At how many points do at least two lines overlap?
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

    // Access point in cartesian plane if it's a line
    if (startX === endX) {
      const lowerPoint = startY < endY ? startY : endY
      const higherPoint = startY >= endY ? startY : endY
      for (let point = lowerPoint; point <= higherPoint; point++) {
        cartesianPlane[point][startX] += 1
      }
    } else if (startY === endY) {
      const lowerPoint = startX < endX ? startX : endX
      const higherPoint = startX >= endX ? startX : endX
      for (let point = lowerPoint; point <= higherPoint; point++) {
        cartesianPlane[startY][point] += 1
      }
    } else {
      // Access point in cartesian plane if itś a diagonal
      const lowerXPoint = startX < endX ? startX : endX
      const higherXPoint = startX >= endX ? startX : endX

      // Ir do menor X para o maior X
      const lowerXPointMatchY = lowerXPoint === startX ? startY : endY
      let yPointCount = lowerXPoint === startX ? startY : endY
      for (let point = lowerXPoint; point <= higherXPoint; point++) {
        cartesianPlane[yPointCount][point] += 1
        if (lowerXPointMatchY === startY)
          yPointCount = startY >= endY ? yPointCount - 1 : yPointCount + 1
        else if (lowerXPointMatchY === endY)
          yPointCount = startY < endY ? yPointCount - 1 : yPointCount + 1
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
