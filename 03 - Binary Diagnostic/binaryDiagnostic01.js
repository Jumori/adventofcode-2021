/**
 * Day 3: Binary Diagnostic
 *
 * --- Part One ---
 *
 * The submarine has been making some odd creaking noises, so you ask it to
 * produce a diagnostic report just in case.
 *
 * The diagnostic report (your puzzle input) consists of a list of binary numbers
 * which, when decoded properly, can tell you many useful thing about the
 * conditions of the submarine. The first parameter to check is the power consumption.
 *
 * You need to use the binary numbers in the diagnostic report to generate two
 * new binary numbers (called the gamma rate and the epsilon rate). The power
 * consumption can then be found by multiplying the gama rate by the epsilon rate.
 *
 * Each bit in the gama rate can be determined by finding the most common bit in
 * the corresponding position of all numbers in the diagnostic report. For
 * example, given the following diagnostic report:
 *
 * 00100
 * 11110
 * 10110
 * 10111
 * 10101
 * 01111
 * 00111
 * 11100
 * 10000
 * 11001
 * 00010
 * 01010
 *
 * Considering only the first bit of each number, there are five `0` bits and
 * seven `1` bits. Since the most common bit is `1`, the first bit of the gamma
 * rate is `1`.
 *
 * The most common second bit of the numbers in the diagnostic report is `0`, so
 * the second bit of the gamma rate is `0`.
 *
 * So, the gamma rate is the binary number `10110`, or `22` in decimal.
 *
 * The epsilon rate is calculated in a similar way; rather than use the most
 * common bit, the least common bit from each position is used. So, the epsilon
 * rate is `01001`, or `9` in decimal. Multiplying the gamma rate (22) by the
 * epsilon rate (9) produces the power consumption, 198.
 *
 * Use the binary numbers in your diagnostic report to calculate the gamma rate
 * and epsilon rate, then multiply them together. What is the power consumption
 * of the submarine? (Be sure to represent your answer in decimal, not binary.)
 */

const externalInput = require(`./diagnosticReport.json`)

// const puzzleInput = [
//   '00100',
//   '11110',
//   '10110',
//   '10111',
//   '10101',
//   '01111',
//   '00111',
//   '11100',
//   '10000',
//   '11001',
//   '00010',
//   '01010',
// ];

const getPowerConsumption = report => {
  const binaryNumberLength = report[0].length // Binary number with n bits
  const bitSum = []

  for (let index = 0; index < binaryNumberLength; index++) {
    bitSum.push({ 0: 0, 1: 0 })
  }

  report.forEach(item => {
    for (let index = 0; index < binaryNumberLength; index++) {
      bitSum[index][item[index]] += 1
    }
  })

  // console.log(bitSum)

  const gammaRate = []
  const epsilonRate = []

  bitSum.forEach(position => {
    gammaRate.push(
      Object.keys(position).reduce((a, b) =>
        position[a] > position[b] ? a : b
      )
    )
    epsilonRate.push(
      Object.keys(position).reduce((a, b) =>
        position[a] < position[b] ? a : b
      )
    )
  })

  const gammaRateAsDecimal = parseInt(gammaRate.join(''), 2)
  const epsilonRateAsDecimal = parseInt(epsilonRate.join(''), 2)

  console.log(`Gamma as decimal: ${gammaRateAsDecimal}`)
  console.log(`Epsilon as decimal: ${epsilonRateAsDecimal}`)

  return gammaRateAsDecimal * epsilonRateAsDecimal
}

console.log(`Power consumption: ${getPowerConsumption(externalInput)}`)
