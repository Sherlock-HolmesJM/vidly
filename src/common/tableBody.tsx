import React from 'react';
import { Column } from './tableHeader';

export interface TableBodyProps {
  data: object[];
  columns: Column[];
}

export interface TableBodyState {}

class TableBody extends React.Component<TableBodyProps, TableBodyState> {
  getProperty = (item: object, path: string) => {
    const paths = path.split('.');

    return paths.reduce((acc, next) => acc[next], item);
  };

  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return this.getProperty(item, column.path);
  };

  rand = () => Math.random() * 1000;

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={this.rand()}>{this.renderCell(item, column)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
