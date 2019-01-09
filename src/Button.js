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
      active: true
    });
    setTimeout(() => {
      this.setState({
        active: false
      });
    }, 400);
  };

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
        onClick={this.playerClick}
      />
    );
  }
}

export default Button;
