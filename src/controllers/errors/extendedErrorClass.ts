export class ExtendedError extends Error {

    public httpStatusCode!: number;
    
    constructor(message?: string) {
        super(message);
        this.name = "extendedError";
        Object.setPrototypeOf(this, new.target.prototype)
    }
}
