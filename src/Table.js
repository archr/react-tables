import React from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import Pagination from './Pagination';

function noop() {}

export default class Table extends React.Component {
  static propTypes = {
    columns: React.PropTypes.array,
    ref: React.PropTypes.string,
    pageNumber: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    classes: React.PropTypes.string,
    getData: React.PropTypes.func,
    fixedHead: React.PropTypes.bool
  }

  static childContextTypes = {
    rows: React.PropTypes.array,
    columns: React.PropTypes.array,
    loading: React.PropTypes.bool,
    fixedHead: React.PropTypes.bool,
    totalRows: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    fetch: React.PropTypes.func
  }

  static defaultProps = {
    ref: 'table',
    pageNumber: 1,
    pageSize: 10,
    totalRows: 0,
    classes: 'table table-hover table-bordered',
    fixedHead: true,
    columns: [],
    getData: noop
  }

  getChildContext() {
    let context = {
      rows: this.state.rows,
      columns: this.props.columns,
      loading: this.state.loading,
      fixedHead: this.props.fixedHead,
      totalRows: this.state.totalRows,
      pageSize: this.props.pageSize,
      fetch: this.fetch
    };

    return context;
  }

  constructor(props) {
    super();

    this.state = {
      rows: [],
      loading: true,
      totalRows: props.totalRows
    };

    this.fetch = this.fetch.bind(this);
    this.setData = this.setData.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  fetch(params={}) {
    let options = {
      limit: this.props.pageSize,
      skip: this.props.pageSize * ((params.pageNumber || 1 ) - 1)
    };

    this.setState({
      loading: true
    });

    this.props.getData(options);
  }

  setData(rows, totalRows) {
    this.setState({
      rows: rows,
      totalRows: totalRows,
      loading: false
    });
  }

  render() {
    let { classes } = this.props;

    return (
      <div>
        <table className={classes}>
          <TableHead/>
          <TableBody/>
        </table>

        <Pagination/>
      </div>
    );
  }
}
