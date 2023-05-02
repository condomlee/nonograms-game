import { useEffect, useState } from 'react';
import { solveNonogram } from '@/utils/puzzle/solver';
import seedrandom from 'seedrandom';
import { getColumnHints } from '@/utils/puzzle/getColumnHints';
import { getRowHints } from '@/utils/puzzle/getRowHints';
import randomPuzzle from "@/utils/puzzle/randomPuzzle";
import Board from "@/components/Board"
import Head from 'next/head';

function App() {
  // TODO: create puzzleId from data
  //
  // > data.map(row => row.join('')).join(",")
  // > "11110,11010,11100,10010,10100,11110,11010,11100,10010,10100"
  //
  // which that string can also be parsed back into a 2d array
  // > string.split(",").map(row => row.split('').map(i => Number(i)))
  const generateSolvablePuzzle = () => {
    const seed = Date.now().toString(36)
    const rng = seedrandom(seed)

    const sizes = [[5, 5], [10, 10]]

    while (true) {
      const [rows, columns] = sizes[Math.floor(rng() * sizes.length)]
      const data = randomPuzzle(rng, rows, columns)
      const rowHints = getRowHints(data)
      const columnHints = getColumnHints(data)
      const nonogram = solveNonogram(rowHints.map((i) => i.map((c) => c.total)), columnHints.map((i) => i.map((c) => c.total)))
      console.log(`NEW PUZZLE ${columns}x${rows}`, nonogram.solved, nonogram.solution)
      if (nonogram.solved) {
        return { seed: seed, puzzle: nonogram.solution, rowHints, columnHints }
      }
    }
  }

  const [data, setData] = useState({ seed: "", puzzle: [], rowHints: [], columnHints: [] })

  useEffect(() => {
    setData(generateSolvablePuzzle())
  }, []);

  const newPuzzle = () => {
    setData(generateSolvablePuzzle())
  }

  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <link rel="icon" type="image/svg+xml" href="favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="A game of endless, randomly generated but solvable, Nonogram puzzles." />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="manifest" href="manifest.json" />

        <title>Endless Nonograms</title>
      </Head>

      <div className="app-root">
        <div className="app-container">
          <Board data={data.puzzle} rowHints={data.rowHints} columnHints={data.columnHints} newPuzzle={newPuzzle} />
        </div>
      </div>
    </>
  )
}

export default App;
