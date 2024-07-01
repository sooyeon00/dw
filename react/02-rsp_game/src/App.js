import "./App.css";

function random(n) {
  return Math.ceil(Math.random() * n);
}

function App() {
  return (
    <div className="App">
      <h2>가위바위보</h2>
      <div>
        <Board name="나" color="yellow" gameHistory={gameHistory} />
        <Board name="나" color="yellow" gameHistory={otherGameHistory} />
      </div>
    </div>
  );
}

export default App;
