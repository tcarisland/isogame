import ArrowKeyPress from '../interfaces/ArrowKeyPress';
import EventQueueListener from '../interfaces/EventQueueListener';

export default class KeyPressEventQueue {
  
  static handle: KeyPressEventQueue = new KeyPressEventQueue();
  
  private keyPressEvents: ArrowKeyPress[];
  private listeners: EventQueueListener[];
  
  private constructor() {
    this.keyPressEvents = [];
    this.listeners = [];
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