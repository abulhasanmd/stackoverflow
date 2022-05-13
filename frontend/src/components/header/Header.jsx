/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../redux/auth/auth.actions';
import { BsFillInboxFill } from 'react-icons/bs';
import { FaCircle } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { ReactComponent as Search } from '../../assets/Search.svg';
import { ReactComponent as Logo } from '../../assets/LogoMd.svg';
import { ReactComponent as SmallLogo } from '../../assets/LogoGlyphMd.svg';
import Spinner from '../Spinner/Spinner';
import LinkButton from '../link-button/LinkButton';
import MobileSideBar from '../mobile-sidebar/MobileSideBar';

import './Header.styles.css';

// 
const handleSubmit = (e) => { 
	e.preventDefault();
	history.push('/questions')
}

const Header = ({auth: {isAuthenticated, loading, user}, logout}) => {
	let history = useNavigate();
	const [searchState, setSearchState] = useState(false);

	const id = user?._id;
	// const user = {
	// 	username: 'John Doe',
	// 	gravatar:
	// 		'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
	// };


	const authLinks = (
		<div className="btns">
			{loading || user === null ? (
				<Spinner width='50px' height='50px' />
			) : (
				<Link to={`/users/${id}`}>
				<img
					alt='user-logo'
					className='logo'
					src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
				/>
				</Link>
			)}
			{'  '}
			<Link to={`/users/${id}`}>
				<div style={{backgroundColor: "", padding:"0px 20px 0px 10px", }}>
					<span className='navbar-stats'>{user?.reputation} </span>
					<span> <FaCircle style={{color:"#FFD700", fontSize: "12px" , paddingRight: "5px"}} /> </span>
					<span className='navbar-stats'>1 </span>
					<span> <FaCircle style={{color:"#a9a9a9", fontSize: "12px", paddingRight: "5px"}} /> </span>
					<span className='navbar-stats'>2 </span>
					<span> <FaCircle style={{color:"#964B00", fontSize: "12px", paddingRight: "5px"}} /> </span>
					<span className='navbar-stats'>8 </span>
				</div>
			</Link>
			<Link
				to={'/messages'}
				title={'Messages'}
				style={{ marginTop:"5px", paddingRight: '20px', color: '#fff' }}
			>
				<BsFillInboxFill style={{ fontSize: '20px' }} />
			</Link>
			<Link
				text={'Log out'}
				to={'/login'}
				type={'s-btn__filled'}
				onClick={logout}
			>
				<FiLogOut style={{ marginTop:"5px", fontSize: '18px', color: "#fff" }} />
			</Link>
		</div>
	);

	const authTabs = (
		<div className="s-navigation">
			<Link to="/questions" className="s-navigation--item is-selected">
				All Questions
			</Link>
		</div>
	);

	const guestTabs = (
	<div className='s-navigation'>
	<Link to='/' className='s-navigation--item is-selected'>
	Products
	</Link>
	<Link to='/questions' className='s-navigation--item not-selected'>
		All Questions
	</Link>
	</div>
	);

	const guestLinks = (
	<div className='btns'>
	<LinkButton text={'Log in'} link={'/login'} type={'s-btn__primary'} />
	<LinkButton text={'Sign up'} link={'/register'} type={'s-btn__filled'} />
	</div>
	);

	const SearchBar = () => {
		return (
			<form
				onSubmit={handleSubmit}
				className="small-search-form"
				autoComplete="off"
			>
				<input
					className="small-search"
					autoComplete="off"
					type="text"
					name="search"
					placeholder="Search..."
				/>
				<Search className="small-search-icon" />
			</form>
		);
	};


	return (
		<Fragment>
			<nav className="navbar fixed-top navbar-expand-lg navbar-light bs-md">
				<div className="hamburger">
					<MobileSideBar hasOverlay />
				</div>
				<div className="header-brand-div">
					<Link className="navbar-brand" to="/">
						<Logo className="full-logo" />
						<SmallLogo className="glyph-logo" />
					</Link>
            <Fragment>{isAuthenticated ? authTabs : guestTabs}</Fragment>
				</div>
				<div className="header-search-div">
					<form
						id="search"
						onSubmit={() => history.push('/questions')}
						className={`grid--cell fl-grow1 searchbar px12 js-searchbar`}
						autoComplete="off"
					>
						<div className="ps-relative search-frame">
							<input
								className="s-input s-input__search h100 search-box"
								style={{ width: '500px' }}
								autoComplete="off"
								type="text"
								name="search"
								placeholder="Search..."
							/>
							<Search />
						</div>
					</form>

					<Search
						className="search-icon"
						onClick={() => setSearchState(!searchState)}
					/>
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
				</div>
			</nav>
			{searchState && <SearchBar />}
		</Fragment>
	);
};

Header.propTypes = {
	logout: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => ({
	auth: state.auth,
  });
  
  export default connect(mapStateToProps, {logout})(Header);
