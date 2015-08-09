import React from 'react';

export default class TableBody extends React.Component {

  static contextTypes = {
    columns: React.PropTypes.array,
    loading: React.PropTypes.bool,
    rows: React.PropTypes.array,
    classes: React.PropTypes.string
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
        {columns.map(({ Component, formatter, field, title, classes }) => {
          if (Component) {
            return <td key={title} className={classes || ''}> <Component row={row}/> </td>;
          }

          else if (formatter) {
            return <td key={title} className={classes || '' } dangerouslySetInnerHTML={{__html: formatter(row[field], row)}}></td>;
          }

          else {
            return <td key={title} className={classes || ''}>{row[field] || '-'}</td>;
          }
        })}
      </tr>
    );
  }


  render() {
    let { columns, loading, rows, classes } = this.context;

    if (loading) {
      return (
        <table className={classes}>
          <tbody>
            <td colSpan={columns.length} style={{textAlign: 'center'}}>
              Loading...
            </td>
          </tbody>
        </table>
      );
    }

    return (
      <table className={classes}>
        <tbody>
          {rows.map(this.getTr)}
        </tbody>
      </table>
    );
  }
}
