import React from 'react';

export type SortColumn = {
  path: string;
  order: string;
};

type Column = {
  path?: string;
  label?: string;
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

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column, index) => (
            <th key={index} onClick={() => this.raiseSort(column.path)}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
