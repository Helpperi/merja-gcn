import React, { useState, useContext } from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
/* import { motion } from 'framer-motion' */
import { useSiteMetadata } from '../hooks/use-site-metadata'
import ColorToggle from './ColorToggle'
import OptionsContext from '../components/OptionsContext'

const Header = styled.header`
  font-family: ${props => props.theme.fonts.body};
  transition: max-height 0.5s cubic-bezier(0.52, 0.16, 0.24, 1), border 0.3s;
  background: ${props => props.theme.colors.primary};
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  max-height: ${props => (props.open ? '100%' : '90px')};
  width: 100%;
  z-index: 99;
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  border-width: ${props => (props.open ? '0' : '1px')};
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    max-height: 90px;
    border-width: 1px;
    padding-bottom: 3em;
  }
`

const Nav = styled.nav`
  width: 100%;
  max-width: ${props => props.theme.sizes.maxWidth};
  margin: 0 auto;
  padding: 0 1.5em;

  ul {
    display: flex;
    justify-content: space-between;
  }

  li {
    display: inline-block;
    margin-left: 1em;
    &:first-of-type {
      position: relative;
      margin: 0;
      flex-basis: 100%;
    }
  }

  a {
    text-decoration: none;
    color: DarkGray;
    font-weight: 600;
    transition: all 0.2s;
    border-bottom: 2px solid ${props => props.theme.colors.text};
    &:hover {
      color: white;
    }
  }
`

const List = styled.ul`
  position: relative;
  padding: 4rem 0 0 0;
  pointer-events: ${props => (props.open ? 'auto' : 'none')};
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    pointer-events: auto;
    display: flex;
    justify-content: flex-end;
    padding: 0;
  }
`

const Item = styled(styled.li)`
  display: block;
  padding: 1rem 0;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    padding: 1em 0 1em 0;
    line-height: 30px;
    display: inline-block;
    margin: 0 0 0 1.5rem;
    opacity: 1 !important;
    visibility: visible !important;
  }
  &:first-of-type {
    padding: 1em 0 2em 0;
    pointer-events: auto;
    line-height: 30px;
    opacity: 1 !important;
    visibility: visible !important;
    font-weight: ${props => props.theme.fonts.boldWeight};
    position: absolute;
    left: 0;
    top: 0;
    margin: 0;
    @media screen and (min-width: ${props => props.theme.responsive.medium}) {
      position: relative;
      flex: 1;
      margin: 0;
    }
  }
  a {
    position: relative;
    text-decoration: none;
    color: #ffffff;
    transition: all 0.3s;
    &:hover {
      color: ${props => props.theme.colors.border};
    }
    @media (hover: none) {
      color: #ffffff;
    }
  }
`

const Toggle = styled.button`
  margin: 0;
  padding: 0;
  z-index: 999;
  transition: transform 0.3s;
  cursor: pointer;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1.5rem;
  width: 1.5rem;
  height: 60px;
  @media screen and (min-width: ${props => props.theme.responsive.medium}) {
    display: none;
  }
  span {
    transition: all 0.3s;
    display: block;
    background: #ffffff;
    width: 100%;
    height: 2px;
  }
  span:first-of-type {
    transform: rotate(${props => (props.open ? '45deg' : '0')})
      translateY(${props => (props.open ? '0' : '.35rem')});
  }
  span:nth-of-type(2n) {
    transform: rotate(${props => (props.open ? '-45deg' : '0')})
      translateY(${props => (props.open ? '0' : '-.35rem')});
    position: relative;
    bottom: ${props => (props.open ? '2px' : '0')};
  }
`

const activeLinkStyle = {
  color: 'white',
}

const Menu = () => {
  const { menuLinks } = useSiteMetadata()
  const options = useContext(OptionsContext)
  const [isOpen, setIsOpen] = useState(false)

  function toggle() {
    setIsOpen(!isOpen)
    document.documentElement.classList.toggle('contain')
  }

  function close() {
    setIsOpen(false)
    document.documentElement.classList.remove('contain')
  }

  const itemVariants = {
    open: {
      opacity: 1,
      visibility: 'visible',
      transition: {
        duration: 0.3,
        delay: 0.2,
      },
    },
    closed: {
      opacity: 0,
      visibility: 'hidden',
      transition: {
        duration: 0.3,
      },
    },
  }

return (
    <Header open={isOpen}>
      <Nav>
        <Toggle open={isOpen} onClick={toggle} aria-label="Toggle Menu">
          <span />
          <span />
        </Toggle>
        <List open={isOpen}>
          {menuLinks.map(link => (
            <Item
              initial={false}
              variants={itemVariants}
              animate={isOpen ? 'open' : 'closed'}
              key={link.name}
            >
              <Link to={link.slug} onClick={close}>
                {link.name}
              </Link>
            </Item>
          ))}
          {options.colorToggle && (
            <Item
              initial={false}
              variants={itemVariants}
              animate={isOpen ? 'open' : 'closed'}
            >
              <ColorToggle />
            </Item>
          )}
        </List>
      </Nav>
    </Header>
  )
}

export default Menu
