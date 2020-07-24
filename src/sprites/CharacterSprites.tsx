class CharacterSprites {

    current: number;
    frames: number;
    static handle: CharacterSprites = new CharacterSprites();

    private constructor() {
        this.current = 0;
        this.frames = 4;
    }

    public static getInstance() {
        return this.handle;
    }

    getNext(dir: number): string {
        this.current = (this.current + 1) % this.frames;
        return "ogre_" + dir + "_" + this.current + ".png";
    }
}

export default CharacterSprites;