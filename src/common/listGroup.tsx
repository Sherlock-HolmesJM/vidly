export interface Props {
  items: any[];
  idProperty?: string;
  textProperty?: string;
  selectedItem: any;
  onItemSelect: (genre: string) => void;
}

const ListGroup: React.FC<Props> = (props: Props) => {
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
              ? 'list-group-item active'
              : 'list-group-item'
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
