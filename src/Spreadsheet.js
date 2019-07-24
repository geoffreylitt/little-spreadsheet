import React, { Component } from 'react';
import _ from 'underscore';

import './App.scss'
import './Spreadsheet.scss';

function classSet(obj) {
  let a = [];

  for (let k in obj) {
    if (obj[k]) {
      a.push(k);
    }
  }

  return a.join(' ');
}

class Cell extends Component {
  render() {
    const {header, value, name} = this.props;

    const number = value && typeof value === "number";

    const className = classSet({
      'spreadsheet__cell': true,
      'spreadsheet__cell--header': header
    });

    return (
      <div
        className={className}
      >
        {value}
      </div>
    )
  }
}

const rows = _.range(1, 30)
const cols = _.range(1, 25)

class Spreadsheet extends Component {
  spreadsheetRef = React.createRef();

  componentDidMount() {
    this.spreadsheetRef.current.focus();
  }

  render() {
    return (
      <div className="app">
        <div
          className="spreadsheet"
          tabIndex="0"
          ref={this.spreadsheetRef}
        >
          <div className="spreadsheet__row">
            <Cell header />
            {
              cols.map(c => (
                <Cell
                  key={c}
                  value={c}
                  name={c}
                  header
                />
              ))
            }
          </div>

          {
            rows.map(r => (
              <div key={r} className="spreadsheet__row">
                <Cell
                  value={r}
                  name={r}
                  header
                />
                {
                  cols.map(c => (
                    <Cell
                      key={[c, r]}
                      name={[c, r]}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Spreadsheet;
