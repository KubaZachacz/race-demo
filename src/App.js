import { useState, useEffect } from 'react';
import './App.scss';
import speedway from "./assets/speedway.svg";
import { Player, Animation } from './animation/animation';
import { colorArray, getRandom, getTime } from './utils';

const randomPlayer = (lp) => {
  return {
    name: `Player_${lp}`,
    helmetColor: colorArray[getRandom(0, colorArray.length - 1)],
    motorColor: colorArray[getRandom(0, colorArray.length - 1)],
    maxVelocity: getRandom(55, 65) / 10,
    acceleration: getRandom(5, 7) / 100,
  }
}

const PlayerCard = ({ disabled, handlePrepare, oldPlayer, lp }) => {
  const [player, setPlayer] = useState({
    name: "",
    helmetColor: "",
    motorColor: "",
    maxVelocity: 0,
    acceleration: 0,
  })

  const handleNewChange = (e) => {
    const newPlayer = {
      ...player
    }

    newPlayer[e.target.name] = e.target.value;

    setPlayer(newPlayer);
  }

  useEffect(() => {
    if (oldPlayer && !player.name) {
      setPlayer(oldPlayer);
    }
    else {
      setPlayer(randomPlayer(lp))
    }
  }, [oldPlayer])


  return (
    <div className="player-card">
      <div>
        <label htmlFor="name">Imię</label>
        <input disabled={disabled} name="name" value={player?.name} onChange={handleNewChange} />
      </div>
      <div className="row">
        <div className="">
          <label htmlFor="helmetColor">Kask</label>
          <input disabled={disabled} type="color" id="helmetColor" name="helmetColor" value={player?.helmetColor} onChange={handleNewChange} />
        </div>
        <div className="">
          <label htmlFor="motorColor">Motocykl</label>
          <input disabled={disabled} type="color" id="motorColor" name="motorColor" value={player?.motorColor} onChange={handleNewChange} />
        </div>
      </div>
      <div className="row">
        <div>
          <label htmlFor="motorColor">Max prędkość</label>
          <input disabled={disabled} type="number" min="1" max="20" name="maxVelocity" value={player?.maxVelocity} onChange={handleNewChange} step="0.1" /></div>
        <div>
          <label htmlFor="motorColor">Przyspieszenie</label>
          <input disabled={disabled} type="number" min="0.01" max="1" name="acceleration" value={player?.acceleration} onChange={handleNewChange} step="0.01" />
        </div>
      </div>
      {!disabled && (
        <div>
          <button className="add-btn" disabled={disabled} onClick={() => handlePrepare(player)}>Dodaj</button>
        </div>
      )}
    </div>
  )
}

function App() {
  const [players, setPlayers] = useState([]);
  const [countDown, setCountdown] = useState(0);
  const [results, setResults] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [isStared, setIsStarted] = useState(false);

  useEffect(() => {
    if (lastResult) {
      setResults([...results, { ...lastResult }])
    }
  }, [lastResult])

  const finishCallback = (player) => {
    setLastResult({ ...player });
  }

  const handlePrepare = (newPlayer) => {
    const sourceContainer = document.getElementById('source');
    const source = sourceContainer.contentDocument;
    const svg = source.querySelector('svg');

    const track = source.querySelector('#track path');
    const sourceSprite = source.querySelector('#player');

    const viewBox = svg.viewBox.baseVal;

    const sprite = sourceSprite.cloneNode(true);
    sprite.id = `player_${players.length}`;

    const { name, motorColor, helmetColor, acceleration, maxVelocity } = newPlayer;

    const motorcycle = sprite.querySelectorAll('.motorcycle')
    motorcycle.forEach((el) => {
      el.style.fill = motorColor;
    })

    sprite.querySelector('.helmet').style.fill = helmetColor;

    svg.appendChild(sprite);

    const player = new Player(players.length, sprite, track, viewBox);

    player.motorColor = motorColor;
    player.helmetColor = helmetColor;

    const offset = {
      x: 25,
      y: 10 + 30 * players.length
    }

    player.prepare(name, offset, parseFloat(maxVelocity), parseFloat(acceleration), finishCallback);

    setPlayers([...players, player]);
  }

  const count = (value, callback) => {
    if (value > 0) {
      setCountdown(value - 1);
      if (value - 1 > 0) {
        setTimeout(() => {
          count(value - 1, callback)
        }, 1000)
      }
      else {
        callback();
      }
    }
  }

  const handleStart = () => {
    const animation = new Animation(players);
    const laps = document.getElementById('laps').value;
    setCountdown(3);
    setIsStarted(true);
    setTimeout(() => {
      count(3, () => { animation.start(laps); })
    }, 1000)
  }

  const handleRestart = () => {
    window.location.reload();
  }

  const isFinish = isStared && results.length === players.length;

  return (
    <div className="App">
      <div className="row">
        <div className="panel">
          <label htmlFor="laps">Okrążenia</label>
          <input type="number" name="laps" id="laps" defaultValue="4" min="1" max="10" />
          {isFinish ? (
            <button className="start-btn" onClick={handleRestart}>Restart</button>
          ) : (
              <button disabled={players.length < 1 && isStared} className="start-btn" onClick={handleStart}>Start</button>
            )}
          <div className="results">
            {results.map(({ id, name, time }) => (
              <p key={`result-${id}`}>{name} - {getTime(time)}</p>
            )
            )}
          </div>
        </div>
        <div className="speedway">
          <object id="source" data={speedway}></object>
          {countDown > 0 && (
            <div className="count-down">{countDown}</div>
          )}
        </div>
      </div>
      <div className="control">
        <p className="title">Zawodnik</p>
        <div className="players-row">
          {players.map(player => <PlayerCard key={`card-${player.id}`} oldPlayer={player} disabled={true} />)}
          {(!isStared && players.length < 4) && (
            <PlayerCard key={`card-new-${players.length}`} lp={players.length + 1} disabled={false} handlePrepare={handlePrepare} />
          )}
        </div>
      </div>
    </div >
  );
}

export default App;
