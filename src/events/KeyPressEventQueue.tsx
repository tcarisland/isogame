import ArrowKeyPress from '../interfaces/ArrowKeyPress';
import EventQueueListener from '../interfaces/EventQueueListener';

export default class KeyPressEventQueue {
  
  static handle: KeyPressEventQueue = new KeyPressEventQueue();
  
  private keyPressEvents: ArrowKeyPress[];
  private listeners: EventQueueListener[];
  private timeouts: NodeJS.Timeout[];
  
  private constructor() {
    this.keyPressEvents = [];
    this.listeners = [];
    this.timeouts = [];
  }
  
  static getInstance() {
    if(KeyPressEventQueue.handle === null) {
      KeyPressEventQueue.handle = new KeyPressEventQueue();
    }
    return KeyPressEventQueue.handle;
  }
  
  public pushKeyPressEvent(kp: ArrowKeyPress) {
    this.keyPressEvents.push(kp);
    this.runListeners();
  }

  public pushRepeatingKeyPressEvent(kp: ArrowKeyPress, interval: number) {
    this.timeouts[this.timeouts.length] = setInterval(function() {
      KeyPressEventQueue.getInstance().pushKeyPressEvent(kp);
    }, 100);
  }

  public stopRepeatingKeyPressEvents() {
    for(let i = 0; i < this.timeouts.length; i++) {
      clearTimeout(this.timeouts[i]);
    }
  }
  
  private runListeners() {
    this.listeners.forEach(listener => {
      while(this.keyPressEvents.length > 0) {
        let event = this.keyPressEvents.pop()!;
        listener.run(event);
      }
    });
  }
  
  public addEventListener(listener: EventQueueListener) {
    this.listeners.push(listener);
  }
  
}