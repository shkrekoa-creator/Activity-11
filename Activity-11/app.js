function Square(props) {
  return React.createElement(
    "button",
    {
      className: "square",
      onClick: props.onClick,
    },
    props.value
  );
}

function Board(props) {
  function renderSquare(i) {
    return React.createElement(Square, {
      value: props.squares[i],
      onClick: () => handleClick(i),
    });
  }

  function handleClick(i) {
    if (props.squares[i] || calculateWinner(props.squares)) return;

    const next = props.squares.slice();
    next[i] = props.xIsNext ? "X" : "O";
    props.onPlay(next);
  }

  const winner = calculateWinner(props.squares);

  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (props.xIsNext ? "X" : "O");

  return React.createElement(
    React.Fragment,
    null,
    React.createElement("div", { className: "status" }, status),

    React.createElement(
      "div",
      { className: "board-row" },
      renderSquare(0),
      renderSquare(1),
      renderSquare(2)
    ),
    React.createElement(
      "div",
      { className: "board-row" },
      renderSquare(3),
      renderSquare(4),
      renderSquare(5)
    ),
    React.createElement(
      "div",
      { className: "board-row" },
      renderSquare(6),
      renderSquare(7),
      renderSquare(8)
    )
  );
}

function Game() {
  const [history, setHistory] = React.useState([Array(9).fill(null)]);
  const [step, setStep] = React.useState(0);

  const current = history[step];
  const xIsNext = step % 2 === 0;

  function play(next) {
    const newHistory = history.slice(0, step + 1).concat([next]);
    setHistory(newHistory);
    setStep(newHistory.length - 1);
  }

  function jump(i) {
    setStep(i);
  }

  function newGame() {
    setHistory([Array(9).fill(null)]);
    setStep(0);
  }

  const moves = history.map(function (_, i) {
    return React.createElement(
      "li",
      { key: i },
      React.createElement(
        "button",
        { onClick: () => jump(i) },
        i === 0 ? "Game start" : "Move #" + i
      )
    );
  });

  return React.createElement(
    "div",
    { className: "game" },

    React.createElement(
      "div",
      { className: "game-board" },
      React.createElement(Board, {
        squares: current,
        xIsNext: xIsNext,
        onPlay: play,
      }),

      React.createElement(
        "button",
        { onClick: newGame, style: { marginTop: "10px" } },
        "New Game"
      )
    ),

    React.createElement(
      "div",
      { className: "game-info" },
      React.createElement("h2", null, "History"),
      React.createElement("ol", { className: "moves-list" }, moves)
    )
  );
}

function calculateWinner(s) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (s[a] && s[a] === s[b] && s[a] === s[c]) {
      return s[a];
    }
  }
  return null;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(Game));