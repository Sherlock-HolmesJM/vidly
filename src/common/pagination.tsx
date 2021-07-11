export interface Props {
  itemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const range = (limit: number) => {
  const range = [...new Array(limit + 1).keys()];
  range.splice(0, 1);
  return range;
};

const Paginate: React.FC<Props> = (props: Props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;

  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = range(pagesCount);

  return (
    <nav>
      <ul className='pagination'>
        {pages.map((p) => (
          <li
            key={p}
            className={'page-item ' + (p === currentPage ? 'active' : '')}
          >
            <a onClick={() => onPageChange(p)} className='page-link' href='/#'>
              {p}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginate;
