import React from 'react';

export default class TableBody extends React.Component {

  static contextTypes = {
    columns: React.PropTypes.array,
    loading: React.PropTypes.bool,
    rows: React.PropTypes.array
  }

  constructor(props, context) {
    super(props, context);

    this.getTr = this.getTr.bind(this);
  }

  getTr(row, index) {
    let { columns, rows } = this.context;

    if (!columns) return null;

    return (
      <tr key={index}>
        {columns.map(({ Component, formatter, field, title }) => {
          if (Component) {
            return <td key={title}> <Component row={row}/> </td>;
          }

          else if (formatter) {
            return <td key={title} dangerouslySetInnerHTML={{__html: formatter(row[field], row)}}></td>;
          }

          else {
            return <td key={title}>{row[field] || '-'}</td>;
          }
        })}
      </tr>
    );
  }


  render() {
    let { columns, loading, rows } = this.context;

    if (loading) {
      return (
        <tbody>
          <td colSpan={columns.length} style={{textAlign: 'center'}}>
            Loading...
          </td>
        </tbody>
      );
    }

    return (
      <tbody>
        {rows.map(this.getTr)}
      </tbody>
    );
  }
}
