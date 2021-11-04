import { Link } from "react-router-dom";




function Header() {
    return (

        
        <header className='header'>
          <div className='container'>
            <div className='top-header'>
            <div className='main-header'>
                <Link to="/" className='logo'><img className='relax' src='../relax-png.png'/></Link>
                {/* <input className='search' type="text" placeholder="Search"  /> */}
            </div>
            <nav className='navbar'>
              <Link>New Releases</Link>
              <Link>Discover </Link>
              <Link>Articles </Link>
              <Link>Recommendations</Link>
              <Link to='/catalog'> Catalog </Link>
              <Link to='/search'> Search </Link>
            </nav>

            </div>
        
        {/* <nav className='menu'>
          <Link to="/">Home</Link>
    </nav> */}
     
          </div>
        </header>
    )
};

export default Header;