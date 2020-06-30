import React, { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { logout } from '../../actions/auth';

const StyledLink = styled(Link)`
  color: white;
  padding: 4px 8px;
    display: block;
    text-align: center;
    box-sizing: border-box;
    margin: auto 0;
    font-weight: ${p => p.isActive ? 'bold' : 'normal'};
    text-decoration: none;
`;

const LogoLink = styled(Link)`
    float: left;
    color: #D7D6D5;
    text-decoration: none;
`

const Menu = styled.nav`
    display: ${p => p.open ? 'block' : 'none'};
    position: absolute;
    width: 100%;
    top: 60px;
    left: 0;
    padding: 8px;
    box-sizing: border-box;

    @media(min-width: 768px){
        display: flex;
        background: none;
        left: initial;
        top: initial;
        margin: auto 0 auto auto;
        border-bottom: none;
        position: relative;
        width: initial;
    }
`;

const MobileMenuIcon = styled.div`
    margin: auto 0 auto auto;
    width: 25px;
    min-width: 25px;
    padding: 5px;
    color: white;
    >div{
        height: 3px;
        margin: 5px 0;
        width: 100%;
        background: white;
    }
    @media(min-width: 768px){
        display: none;
    }
`
const HeaderWrapper = styled.header`
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    padding: 0 16px;
    position: fixed;
    top: 0;
`;

const StyledUl = styled.ul`
    list-style: none;
    display: flex;
`

const StyledList = styled.li`
    > a {
        position: relative;
        color: #BFBDBC;
        text-decoration: none;
    }
    > a:hover {
        color: #8E8C89;
    }
    > a:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #AD4D2A;
        visibility: hidden;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        -webkit-transition: all 0.3s ease-in-out 0s;
        transition: all 0.3s ease-in-out 0s;
    }
    > a:hover:before {
        visibility: visible;
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }
`


const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const { pathname } = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const authLinks = (
        <HeaderWrapper>
            <MobileMenuIcon onClick={() => setMenuOpen(!menuOpen)}>
                <div />
                <div />
                <div />
            </MobileMenuIcon>
            <Menu open={menuOpen}>
                <StyledUl>
                    <StyledList>
                        <StyledLink to='/designer-profiles'>
                            <span>designers</span>
                        </StyledLink>
                    </StyledList>
                    <StyledList>
                        <StyledLink to='/profiles'>
                            <span>developers</span>
                        </StyledLink>
                    </StyledList>
                    <StyledList>
                        <StyledLink to='/posts'>
                            <span>job-board</span>
                        </StyledLink>
                    </StyledList>
                    <StyledList>
                        <StyledLink to='/portfolios'>
                            <span>posts</span>
                        </StyledLink>
                    </StyledList>
                    <StyledList>
                        <StyledLink to='/dashboard'>
                            <span>dashboard</span>
                        </StyledLink>
                    </StyledList>
                    <StyledList>
                        <StyledLink onClick={logout} href='#!'>
                            <span>Logout</span>
                        </StyledLink>
                    </StyledList>
                </StyledUl>
            </Menu>
        </HeaderWrapper>
    );

    return (
        <nav className='navbar bg-dark'>
            <h1>
                {isAuthenticated && (
                    <LogoLink to='/' logo>
                        code<span style={{ color: '#F16350' }}>D</span>esign
                    </LogoLink>
                )}
            </h1>
            {<Fragment>{isAuthenticated ? authLinks : null}</Fragment>}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
