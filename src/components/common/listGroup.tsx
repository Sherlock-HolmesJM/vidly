export interface Props {
  items: any[];
  idProperty?: string;
  textProperty?: string;
  selectedItem: any;
  onItemSelect: (genre: string) => void;
}

const ListGroup: React.FC<Props> = (props) => {
  const {
    onItemSelect,
    items,
    selectedItem: selectedGenre,
    idProperty = '_id',
    textProperty = 'name',
  } = props;

  return (
    <ul className='list-group'>
      {items.map((item) => (
        <li
          key={item[idProperty]}
          className={
            selectedGenre === item
              ? 'list-group-item active clickable'
              : 'list-group-item clickable'
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
