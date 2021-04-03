import { Link } from 'react-router-dom';
export const Navbar = ({footer}) => {

    return (
        <div className='header'>
        {footer?<p className='center'>©2021 MyPat Trending App</p>:<span><Link to='/'>MyPat Trending App</Link></span>}       
      </div>
    )
}
export default Navbar;
