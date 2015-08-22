import React from 'react';

export default class TableBody extends React.Component {

  static contextTypes = {
    columns: React.PropTypes.array,
    loading: React.PropTypes.bool,
    rows: React.PropTypes.array,
    classes: React.PropTypes.string,
    dimentions: React.PropTypes.object
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
          let style = {};
          if (!classes) {
            style.width = parseFloat((100 / columns.length)).toFixed(2) + '%';
          }

          if (Component) {
            return <td key={title} className={classes || ''} style={style}> <Component row={row}/> </td>;
          }
          else if (formatter) {
            return <td key={title} className={classes || '' } style={style} dangerouslySetInnerHTML={{__html: formatter(row[field], row)}}></td>;
          }
          else {
            return <td key={title} className={classes || ''} style={style}>{row[field] || '-'}</td>;
          }
        })}
      </tr>
    );
  }


  render() {
    let { columns, loading, rows, classes, dimentions } = this.context;
    return (
      <div style={{height: dimentions.height, overflow: 'auto'}}>
        <table className={classes}>
          <tbody>
            { loading
              ? <tr><td colSpan={columns.length} style={{textAlign: 'center'}}>Loading...</td></tr>
              : rows.map(this.getTr)
            }

            { loading || rows.length ? null
              : <tr><td colSpan={columns.length} style={{textAlign: 'center'}}>No information</td></tr>
            }
          </tbody>
        </table>
      </div>
    );
  }
}
