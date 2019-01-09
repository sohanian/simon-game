import React from "react";

class Button extends React.Component {
  state = {
    active: false
  };

  componentDidMount() {
    this.props.broadcaster.subscribe(this);
  }

  componentWillUnmount() {
    this.props.broadcaster.unsubscribe(this);
  }

  update = newColor => {
    if (newColor === this.props.color) {
      this.activate();
    }
  };

  activate = () => {
    if (!this.props.muted) {
      this.sound.play();
    }
    
    this.setState({
      active: true,
    });
  };

  inactivate = () => 
    this.setState({
      active: false,
    });

  sound = new Audio(`/sounds/${this.props.color}.mp3`);

  playerClick = () => {
    if (!this.props.isPlayerTurn) return;
    this.activate();
    this.props.playerClick(this.props.color);
  };

  render() {
    const { color, isPlayerTurn } = this.props;
    const { active } = this.state;
    return (
      <div
        className={`button ${color} ${active ? "active" : ""} ${isPlayerTurn ? "clickable" : ""}`}
        onClick={this.playerClick} onTransitionEnd={this.inactivate}
      />
    );
  }
}

export default Button;
