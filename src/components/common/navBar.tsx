import { NavLink, Link } from 'react-router-dom';

export interface NavBarProps {
  title: string;
  items: NavBarItems[];
}

type NavBarItems = {
  path: string;
  label: string;
};

const NavBar: React.FC<NavBarProps> = ({ title, items }) => {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light mb-4'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          {title}
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            {items.map((item) => (
              <NavLink
                className='nav-link nav-item'
                aria-current='page'
                to={'/' + item.path}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
