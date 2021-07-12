import React from 'react';

export type SortColumn = {
  path: string;
  order: string;
};

export type Column = {
  path?: string;
  label?: string;
  key?: string;
  content?: (item: any) => void;
};

export interface TableHeaderProps {
  columns: Column[];
  sortColumn: SortColumn;
  onSort: (sortColumn: SortColumn) => void;
}

export interface TableHeaderState {}

class TableHeader extends React.Component<TableHeaderProps, TableHeaderState> {
  raiseSort = (path: string) => {
    let sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'des' : 'asc';
    else sortColumn = { path, order: 'asc' };

    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className='fa fa-sort-asc'></i>;
    return <i className='fa fa-sort-desc'></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              key={column.path || column.key}
              className='clickable'
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
