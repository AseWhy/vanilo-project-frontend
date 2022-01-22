import { ExtractRouteParams } from "react-router";
import { generatePath } from "react-router-dom";

/**
 * Абстракция для реализации класса который может использоваться удобной для записи путей сейрвиса
 */
export default abstract class Route {
    private readonly _path: string | (() => string);
    private readonly _parent?: Route;

    /**
     * Конструктор класса
     * 
     * @param path путь до марсшрута (или функция его получения) который необходимо разрешить таким образом
     * @param parent родительский марсшрут
     */
    protected constructor(path: string | (() => string), parent?: Route) {
        this._path = path;
        this._parent = parent;
    }

    /**
     * Получает путь до марсшрута записанного как результат ацессора path, с переданными ему параметрами `params`
     * 
     * @param params параметры разрешения текущего марсшрата
     * @returns марсшрут с проставленными параматрами
     */
    public route(params: ExtractRouteParams<string> = {}): string {
        return generatePath((this._parent?.route(params) ?? '') + this.path, params);
    }

    /**
     * Пытается получить марсшрут без параметров
     */
    public get routeWithoutParams(): string {
        return ((this._parent?.routeWithoutParams ?? '') + this.path)
    }

    /**
     * Получает строковое значение для марсшрута
     */
    public get path(): string {
        if(typeof this._path == 'string') {
            return this._path;
        } else {
            return this._path.call(null);
        }
    }
}