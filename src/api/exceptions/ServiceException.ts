export default class ServiceException extends Error {
    public code: string | number;
    public errno: number | undefined;
    public errors: object | undefined

    public constructor(message: string, code: string | number, errno: number | undefined, errors?:object) {
        super(message);

        this.errno = errno;
        this.code = code;
        this.errors = errors;
    }
}