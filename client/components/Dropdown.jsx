import React from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div``;
const DropdownButton = styled.button`
  border: none;
  background-color: #F6F6F6;
`;
const OptionsContainer = styled.div`
  border: 1px solid #999999;
  color: #777777;
  font-size: 6px;
  display: flex;
  flex-direction: column;
  position:fixed;
`;
const OptionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  background-color:white;
  position: relative;
  border: none;

  :focus{
    background-color: none
  }
`;


class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  showMenu(event) {
    event.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    });
  }

  render() {
    return (
      <DropdownContainer>
        <DropdownButton onClick={this.showMenu}>{this.props.button.name}</DropdownButton>

        {
          this.state.showMenu
            ? (
              <OptionsContainer>
                {this.props.button.options.map(option => <OptionButton>{option}</OptionButton>)}
              </OptionsContainer>
            )
            : (
              null
            )
        }
      </DropdownContainer>
    );
  }
}

export default Button;
