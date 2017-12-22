import React from 'react';

export default function InputForm(props) {
  return (
    <form>
      <label>
        Rows:
        {/* <input type="text" pattern="[0-9]*" value={props.gameConfig.rows} onChange={props.changeRows} /> */}
        <input type="number" name="quantity" min="1" max="20" value={props.gameConfig.rows} onChange={props.changeRows} />
      </label>
      <label>
        Columns:
        <input type="number" name="quantity" min="1" max="20" value={props.gameConfig.columns} onChange={props.changeColumns} />
      </label>
      <label>
        Mines:
        <input type="number" name="quantity" min="1" max={props.gameConfig.rows*props.gameConfig.columns} value={props.gameConfig.mines} onChange={props.changeMines} />
      </label>

    </form>
  );
}
