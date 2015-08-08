import React from 'react';

export default class TableHead extends React.Component {
  static contextTypes = {
    columns: React.PropTypes.array.isRequired
  }

  render() {
    let { columns } = this.context;

    return (
      <thead>
        <tr>
          {columns.map((c) => {
            return <th key={c.field}>{c.title}</th>;
          })}
        </tr>
      </thead>
    );
  }
}
