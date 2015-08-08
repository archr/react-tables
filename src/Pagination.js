import React from 'react';

export default class Pagination extends React.Component {
  static contextTypes = {
    totalRows: React.PropTypes.number,
    pageSize: React.PropTypes.number,
    fetch: React.PropTypes.func
  }

  constructor() {
    super();

    this.state = {
      pageNumber: 1
    };

    this.onPageFirst = this.onPageFirst.bind(this);
    this.pagine = this.pagine.bind(this);
  }

  onPageFirst() {
    this.updatePagination({
      pageNumber: 1
    });
  }

  onPageLast(lastPage) {
    this.updatePagination({
      pageNumber: lastPage
    });
  }

  onPageNumber(number) {
    this.updatePagination({
      pageNumber: number
    });
  }

  updatePagination(params) {
    this.setState(params);
    this.context.fetch(params);
  }

  calcule() {
    let { totalRows, pageSize } = this.context;
    let { pageNumber } = this.state;
    let totalPages = ~~((totalRows - 1) / pageSize) + 1;
    let from, to;

    if (totalPages) {
      from = 1;
      to = totalPages;
    }
    else {
      from = pageNumber - 2;
      to = from + 4;

      if (from < 1) {
        from = 1;
        to = 5;
      }

      if (to > totalPages) {
        to = totalPages;
        from = to - 4;
      }
    }

    return {
      totalPages: totalPages,
      from: from,
      to: to
    };
  }

  pagine(from, to, pageNumber) {
    let pages = [];

    for(let i = from; i <= to; i++) {
      let classes = i === pageNumber ? ' active' : '';
      pages.push(<li className={classes} key={i}><a onClick={this.onPageNumber.bind(this, i)}>{ i }</a></li>);
    }

    return pages;
  }

  render() {
    let { pageNumber } = this.state;
    let { from, to, totalPages } = this.calcule();

    return (
      <div>
        <ul className='pagination'>
          <li className={pageNumber <= 1 ? 'disabled' : ''}>
            <a href='#' aria-label='Previous' onClick={this.onPageFirst}>
              <span aria-hidden='true'>&laquo;</span>
            </a>
          </li>

          {this.pagine(from, to, pageNumber)}

          <li className={pageNumber >= totalPages ? 'disabled' : ''}>
            <a href='#' aria-label='Next' onClick={this.onPageLast.bind(this, totalPages)}>
              <span aria-hidden='true'>&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
