/**
 * --- Day 4: Giant Squid ---
 *
 * --- Part Two ---
 *
 * On the other hand, it might be wise to try a different strategy: let the
 * giant squid win.
 *
 * You aren't sure how many bingo boards a giant squid could play at once, so
 * rather than waste time counting its arms, the safe thing to do is to figure
 * out which board will win last and choose that one. That way, no matter
 * which boards it picks, it will win for sure.
 *
 * In the above example, the second board is the last to win, which happens
 * after 13 is eventually called and its middle column is completely marked.
 * If you were to keep playing until this point, the second board would have a
 * sum of unmarked numbers equal to 148 for a final score of 148 * 13 = 1924.
 *
 * Figure out which board will win last. Once it wins, what would its final score be?
 */

const externalInput = require('./bingoData.json')

// const puzzleInput = {
//   drawnNumbers: [
//     7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
//     20, 8, 19, 3, 26, 1
//   ],
//   cards: [
//     [
//       [22, 13, 17, 11, 0],
//       [8, 2, 23, 4, 24],
//       [21, 9, 14, 16, 7],
//       [6, 10, 3, 18, 5],
//       [1, 12, 20, 15, 19]
//     ],
//     [
//       [3, 15, 0, 2, 22],
//       [9, 18, 13, 17, 5],
//       [19, 8, 7, 25, 23],
//       [20, 11, 10, 24, 4],
//       [14, 21, 16, 12, 6]
//     ],
//     [
//       [14, 21, 17, 24, 4],
//       [10, 16, 15, 9, 19],
//       [18, 8, 23, 26, 20],
//       [22, 11, 13, 6, 5],
//       [2, 0, 12, 3, 7]
//     ]
//   ]
// }

const createCard = (cardNumbers, lines, columns) => {
  return {
    matrixOfNumbers: cardNumbers,
    markedNumbers: Array.from(Array(lines), () => new Array(columns)),
    lines: lines,
    columns: columns,
    isCompleted: false,
    lastDrawnNumber: null,
    isLastCompleted: false
  }
}

const calculateCardScore = card => {
  const score = card.markedNumbers.reduce((acc, row, rowIdx) => {
    let rowSum = 0
    for (let columnIdx = 0; columnIdx < card.columns; columnIdx++) {
      if (row[columnIdx] === undefined) {
        rowSum += card.matrixOfNumbers[rowIdx][columnIdx]
      }
    }
    return (acc += rowSum)
  }, 0)

  console.log(`Sum of all unmarked numbers: ${score}`)
  console.log(`Last drawn number: ${card.lastDrawnNumber}`)

  return score * card.lastDrawnNumber
}

const getLastVictoriousCard = ({ drawnNumbers, cards: _cards }) => {
  const cards = _cards.map(card =>
    createCard(card, card.length, card[0].length)
  )

  drawnNumbers.forEach(number => {
    if (!cards.find(card => !card.isCompleted)) return
    console.log(`--- Drawn new number ---`)

    cards.forEach(card => {
      const cardContainsNumber = card.matrixOfNumbers.find(n =>
        n.includes(number)
      )
      if (cardContainsNumber) {
        const rowIndex = card.matrixOfNumbers.findIndex(n => n.includes(number))
        const columnIndex = cardContainsNumber.findIndex(n => n === number)
        card.markedNumbers[rowIndex][columnIndex] = number
        console.table(card.markedNumbers)
      }

      // Check if this card is completed
      const cardIsCompletedByRow = card.markedNumbers.some(
        cardRow => !cardRow.includes(undefined)
      )
      let cardIsCompletedByColumn = false
      for (let column = 0; column < card.columns; column++) {
        const columnValues = []
        for (let row = 0; row < card.lines; row++) {
          columnValues.push(card.markedNumbers[row][column])
        }
        if (!columnValues.includes(undefined)) cardIsCompletedByColumn = true
      }

      if (cardIsCompletedByRow || cardIsCompletedByColumn) {
        card.isCompleted = true
        card.lastDrawnNumber = number

        // Check if all cards are completed
        const incompleteCardExists = cards.find(c => !c.isCompleted)
        if (!incompleteCardExists) {
          card.isLastCompleted = true
        }
      }
    })
  })

  const lastCardToBeCompleted = cards.find(card => card.isLastCompleted)
  console.log(lastCardToBeCompleted)

  return calculateCardScore(
    lastCardToBeCompleted,
    lastCardToBeCompleted.lastDrawnNumber
  )
}

console.log(`Card score: ${getLastVictoriousCard(externalInput)}`)
