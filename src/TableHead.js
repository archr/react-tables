import React from 'react';

export default class TableHead extends React.Component {
  static contextTypes = {
    columns: React.PropTypes.array.isRequired,
    classes: React.PropTypes.string
  }

  render() {
    let { columns } = this.context;

    return (
      <div>
        <table className={this.context.classes} style={{marginBottom: 0}}>
          <thead>
            <tr>
              {columns.map(({ field, title, classes }) => {
                let style = {};
                if (!classes) {
                  style.width = parseFloat((100 / columns.length)).toFixed(2) + '%';
                }

                return <th key={field} className={classes || ''} style={style}>{title}</th>;
              })}
            </tr>
          </thead>
        </table>
      </div>
    );
  }
}
