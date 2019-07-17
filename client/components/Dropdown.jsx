import React from 'react';

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
      <div>
        <button className="options" onClick={this.showMenu}>{this.props.button.name}</button>

        {
          this.state.showMenu
            ? (
              <div className="menu">
                {this.props.button.options.map(option => <button className="options">{option}</button>)}
              </div>
            )
            : (
              null
            )
        }
      </div>
    );
  }
}

export default Button;
