import { useState } from 'react';
import './App.css';
import speedway from "./assets/speedway.svg";
import { Player, Animation } from './animation/animation';
import { colorArray, getRandom } from './utils';

function App() {
  const [players, setPlayers] = useState([]);

  const handlePrepare = () => {
    const sourceContainer = document.getElementById('source');
    const source = sourceContainer.contentDocument;
    const svg = source.querySelector('svg');

    const track = source.querySelector('#track path');
    const sourceSprite = source.querySelector('#player');

    const viewBox = svg.viewBox.baseVal;

    const sprite = sourceSprite.cloneNode(true);
    sprite.id = `player_${players.length}`;

    const motorColor = colorArray[getRandom(0, colorArray.length - 1)];
    const motorcycle = sprite.querySelectorAll('.motorcycle')
    motorcycle.forEach((el) => {
      el.style.fill = motorColor;
    })


    const helmetColor = colorArray[getRandom(0, colorArray.length - 1)];
    sprite.querySelector('.helmet').style.fill = helmetColor;

    svg.appendChild(sprite);

    const player = new Player(players.length, sprite, track, viewBox);

    const offset = {
      x: 25,
      y: 10 + 30 * players.length
    }

    const maxVelocity = getRandom(40, 60) / 10;
    const acceleration = getRandom(5, 6) / 100;

    player.prepare(offset, maxVelocity, acceleration);

    setPlayers([...players, player]);
  }

  const handleStart = () => {
    const animation = new Animation(players);
    const laps = document.getElementById('laps').value;

    animation.start(laps);
  }

  return (
    <div className="App">
      <div className="speedway">
        <object id="source" data={speedway}></object>
      </div>
      <div className="control">
        <button onClick={handlePrepare}>Prepare</button>
        <button onClick={handleStart}>Start</button>
        <div>
          <label htmlFor="laps">laps</label>
          <input type="number" name="laps" id="laps" defaultValue="1" />
        </div>
        {/* <div>
          <label htmlFor="duration">duration: <span id="duration-val">5000</span>ms</label>
          <input type="range" name="duration" id="duration" min="500" max="30000" step="250" defaultValue="5000" />
        </div> */}
        {/* <div>
          <label htmlFor="offset">offset: <span id="offset-val">50</span>px</label>
          <input type="range" name="offset" id="offset" min="0" max="150" step="1" defaultValue="0" />
        </div> */}
      </div>
    </div>
  );
}

export default App;
