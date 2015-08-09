import React from 'react';

export default class TableHead extends React.Component {
  static contextTypes = {
    columns: React.PropTypes.array.isRequired,
    classes: React.PropTypes.string
  }

  render() {
    let { columns } = this.context;

    return (
      <table className={this.context.classes} style={{marginBottom: 0}}>
        <thead>
          <tr>
            {columns.map(({ field, title, classes }) => {
              return <th key={field} className={classes || ''}>{title}</th>;
            })}
          </tr>
        </thead>
      </table>
    );
  }
}
