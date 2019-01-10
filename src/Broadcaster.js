class Broadcaster {
  subscribers = [];

  subscribe = (subscriber) => this.subscribers.push(subscriber);
  
  unsubscribe = (subscriber) => this.subscribers = this.subscribers.filter(sub => sub !== subscriber);

  broadcast = (color) => {
    this.subscribers.forEach(sub => {
      sub.update(color);
    })
  };
}

export default Broadcaster;