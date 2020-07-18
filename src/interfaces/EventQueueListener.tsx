import ArrowKeyPress from '../interfaces/ArrowKeyPress';

interface EventQueueListener {
    source: React.Component,
    run(keyPress: ArrowKeyPress): void
}

export default EventQueueListener;