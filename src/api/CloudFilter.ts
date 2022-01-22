import iCloudFilterField from "./support/iCloudFilterField";
import iCloudFilterOrder from "./support/iCloudFilterOrder";
import iCloudFilterPagination from "./support/iCloudFilterPagination";
import iNewCloudFilterOrder from "./support/iNewCloudFilterOrder";
import iNewCloudFilterOrderEntry from "./support/iNewCloudFilterOrderEntry";

export enum CloudFilterOperator {
    IsNotNull = 'is not null',
    IsNull = 'is null',
    Larger = '>',
    Less = '<',
    BiggerOrLess = '<>',
    Equal = '=',
    NotEqual = '!=',
    LargerOrEqual = '>=',
    LessOrEqual = '<=',
    Like = 'like',
    NotLike = 'not like',
    ILike = 'ilike',
    NotILike = 'not ilike',
    In = 'in',
    NotIn = 'not in'
}

export enum CloudFilterOrder {
    ASC,
    DESC
}

export enum CloudFilterCmpOperator {
    AND = 'AND',
    OR = 'OR'
}

function isCommonPresset(presset: any) {
    return presset === "common";
}

function makeNewNoodleOrder(): iNewCloudFilterOrderEntry {
    return { fields: [], isAsc: true };
}

function makeNewCloudOrder(): iCloudFilterOrder {
    return { fields: [], direction: 'asc' };
}

/**
 * Т.к. у фильтров есть нескольков версий, я подумал что лучше сразу указывать какой прессет фильтра использовать
 */
const pressets: any = {
    common(criteria: any) {
        criteria.criteria_key = 'criteriaList';
        criteria.operator_key = 'queryOperator';
        criteria.use_lower_qo_case = true;
    },

    new(criteria: any){
        criteria.criteria_key = 'criteria';
        criteria.operator_key = 'operator';
        criteria.use_lower_qo_case = false;
    }
};

type tPresset = typeof pressets;

export class CloudCriteria {
    private criteria: Array<iCloudFilterField|CloudQuery>;
    private operator: CloudFilterCmpOperator;

    private criteria_key: string = 'criteria';
    private operator_key: string = 'operator';
    private use_lower_qo_case: boolean = false;
    private filter: CloudFilter;

    constructor(filter: CloudFilter) {
        this.criteria = [];
        this.operator = CloudFilterCmpOperator.AND;
        this.filter = filter;

        if(filter.presset != null) {
            this.usePresset(filter.presset);
        }
    }

    /**
     * Добавить условия фильтрации
     * 
     * @param item условия фильтрации
     * @returns текущие критерии
     */
    protected add(item: iCloudFilterField|CloudQuery) {
        this.criteria.push(item); return this;
    }

    /**
     * Установить оператор фильтра
     * 
     * @param operator оператор фильтра
     */
    public setOperator(operator: CloudFilterCmpOperator) {
        this.operator = operator;
    }
    
    /**
     * Успользовать прессет для фильтра
     * 
     * @param name название прессета
     * @returns текущие критерии
     */
    public usePresset(name: keyof tPresset) {
        const presset = pressets[name] as Function;

        if(presset != null) {
            presset(this);
        }

        return this;
    }

    /**
     * Добавляет условие для поля field с оператором operator и значением value
     * 
     * @param field имя поля
     * @param operator оператор условия
     * @param value сравниваемое значение
     * @returns текущие критерии
     */
    public where(field: string, operator: CloudFilterOperator, value: any) {
        return this.add({
            field,
            value,
            operator: operator != CloudFilterOperator.Equal ? operator : undefined
        });
    }

    /**
     * Добавляет условие для поля field = val1
     * 
     * @param field имя поля
     * @param value сравниваемое значение
     * @returns текущие критерии
     */
    public equal(field: string, value: any) {
        return this.add({
            field,
            value
        });
    }

    /**
     * Добавляет условие для поля field > val1
     * 
     * @param field имя поля
     * @param value сравниваемое значение
     * @returns текущие критерии
     */
    public larger(field: string, value: any) {
        return this.add({
            field,
            value,
            operator: CloudFilterOperator.Larger
        });
    }

    /**
     * Добавляет условие для поля field < val1
     * 
     * @param field имя поля
     * @param value сравниваемое значение
     * @returns текущие критерии
     */
    public less(field: string, value: any) {
        return this.add({
            field,
            value,
            operator: CloudFilterOperator.Less
        });
    }

    /**
     * Добавляет условие для поля field >= val1
     * 
     * @param field имя поля
     * @param value сравниваемое значение
     * @returns текущие критерии
     */
    public largerOrEqual(field: string, value: any) {
        return this.add({
            field,
            value,
            operator: CloudFilterOperator.LargerOrEqual
        });
    }

    /**
     * Добавляет условие для поля field <= val1
     * 
     * @param field имя поля
     * @param value сравниваемое значение
     * @returns текущие критерии
     */
    public lessOrEqual(field: string, value: any) {
        return this.add({
            field,
            value,
            operator: CloudFilterOperator.LessOrEqual
        });
    }

    /**
     * Добавляет условие для поля field IS NULL
     * 
     * @param field имя поля
     * @returns текущие критерии
     */
    public isNotNull(field: string) {
        return this.add({
            field,
            operator: CloudFilterOperator.IsNotNull
        });
    }

    /**
     * Добавляет условие для поля field IS NOT NULL
     * 
     * @param field имя поля
     * @returns текущие критерии
     */
    public isNull(field: string) {
        return this.add({
            field,
            operator: CloudFilterOperator.IsNull
        });
    }

    /**
     * Добавляет условие для поля field LIKE 'val1'
     * 
     * @param field имя поля
     * @param value сравниваемое значение
     * @returns текущие критерии
     */
    public isLike(field: string, value: any) {
        return this.add({
            field,
            value,
            operator: CloudFilterOperator.Like
        });
    }

    /**
     * Добавляет условие для поля field ILIKE 'val1'
     * 
     * !! Актуально для сервисов с базой postgresql где like регистрочувствительный а ilike нет. !!
     * 
     * @param field имя поля
     * @param value сравниваемое значение
     * @returns текущие критерии
     */
    public isILike(field: string, value: any) {
        return this.add({
            field,
            value,
            operator: CloudFilterOperator.ILike
        });
    }

    /**
     * Добавляет условие для поля field NOT ILIKE 'val1'
     * 
     * !! Актуально для сервисов с базой postgresql где like регистрочувствительный а ilike нет. !!
     * 
     * @param field имя поля
     * @param value сравниваемое значение
     * @returns текущие критерии
     */
    public isNotILike(field: string, value: any) {
        return this.add({
            field,
            value,
            operator: CloudFilterOperator.NotILike
        });
    }

    /**
     * Добавляет условие для поля field <> val1
     * 
     * @param field имя поля
     * @param value сравниваемое значение
     * @returns текущие критерии
     */
    public isNotEqual(field: string, value: any) {
        return this.add({
            field,
            value,
            operator: CloudFilterOperator.NotEqual
        });
    }

    /**
     * Добавляет условие для поля field NOT LIKE 'val1'
     * 
     * @param field имя поля
     * @param value сравниваемое значение
     * @returns текущие критерии
     */
    public isNotLike(field: string, value: any) {
        return this.add({
            field,
            value,
            operator: CloudFilterOperator.NotLike
        });
    }

    /**
     * Добавляет условие для поля field IN (val1, val2, val3)
     * 
     * @param field имя поля
     * @param value сравниваемое значение
     * @returns текущие критерии
     */
    public in(field: string, value: any) {
        return this.add({
            field,
            value,
            operator: CloudFilterOperator.In
        });
    }

    /**
     * Добавляет условие для поля field NOT IN (val1, val2, val3)
     * 
     * @param field имя поля
     * @param value сравниваемое значение
     * @returns текущие критерии
     */
    public notIn(field: string, value: any) {
        return this.add({
            field,
            value,
            operator: CloudFilterOperator.NotIn
        });
    }

    /**
     * Добавляет условие для поля >=
     * 
     * @param field имя поля
     * @param value сравниваемое значение
     * @returns текущие критерии
     */
    public biggerOrLess(field: string, value: any) {
        return this.add({
            field,
            value,
            operator: CloudFilterOperator.BiggerOrLess
        });
    }

    /**
     * Создает новый подзапрос с оператором AND эквивалент (COND1 AND COND2 AND COND3) <- новый запрос куда билдером добавляются условия
     * 
     * @param builder билдер
     * @returns текущие критерии
     */
    public and(builder: (bilder: CloudCriteria) => void) {
        const query = new CloudQuery(this.filter);

        query.exec((criteria: CloudCriteria) => {            
            builder(criteria);
        });

        return this.add(query);
    }

    /**
     * Создает новый подзапрос с оператором OR эквивалент (COND1 OR COND2 OR COND3) <- новый запрос куда билдером добавляются условия
     * 
     * @param builder билдер
     * @returns текущие критерии
     */
    public or(builder: (bilder: CloudCriteria) => void) {
        const query = new CloudQuery(this.filter);

        query.exec((criteria: CloudCriteria) => {
            criteria.setOperator(CloudFilterCmpOperator.OR);

            builder(criteria);
        });

        return this.add(query);
    }

    /**
     * Преобразовать критерии в json объект
     * 
     * @returns json объект
     */
    public toJSON(){
        return {
            [this.operator_key]: this.use_lower_qo_case ? this.operator.toLowerCase() : this.operator,
            [this.criteria_key]: this.criteria
        }
    }
}

export class CloudQuery {
    protected query: CloudCriteria;

    /**
     * Создает новый экземпляр REST запроса
     * 
     * @param filter REST фильтр
     */
    constructor(filter: CloudFilter) {
        this.query = new CloudCriteria(filter);
    }

    /**
     * Выполнить опирацию построения запроса с билдером
     * 
     * @param builder билдер запроса
     * @returns текущий запрос
     */
    public exec(builder: (bilder: CloudCriteria) => void) {
        builder(this.query);

        return this;
    }
}

export default class CloudFilter {
    // ts-ignore инициализирую функцией flushOrder, валидатор тупит
    protected order: iCloudFilterOrder | iNewCloudFilterOrder = [];
    protected query: CloudCriteria;
    protected pagination: iCloudFilterPagination;
    protected page: number;
    protected pageCount: number;
    
    private enable_pagination: boolean;
    private enable_order: boolean;
    private _presset: keyof tPresset | undefined;

    /**
     * Создает новый экземпляр REST фильтра
     * 
     * @param presset прессет фильтра
     */
    constructor(presset?: keyof tPresset){
        this._presset = presset;

        this.flushOrder();

        this.pagination = { from: 0, count: 10 };
        this.page = 0;
        this.pageCount = 10;

        this.enable_pagination = false;
        this.enable_order = false;

        this.query = new CloudCriteria(this);
    }

    /**
     * Устанавливает страницу
     * 
     * @param page страница запрашиваемая фильтром
     * @returns текущий REST фильтр
     */
    public setPage(page: number) {
        this.pagination.from = page;
        this.page = page;

        if(this.pagination.from !== 0) {
            this.enable_pagination = true;
        }

        return this;
    }

    /**
     * Устанавливает количество элементов выводимых на страницу
     * 
     * @param count  количество элементов выводимых на страницу
     * @returns текущий REST фильтр
     */
    public setCountPerPage(count: number) {
        this.pagination.count = count;
        this.pageCount = count;

        this.enable_pagination = true;

        return this;
    }

    /**
     * Очищает сортировку для фильтра
     * 
     * @returns текущий REST фильтр
     */
    public flushOrder() {
        if(isCommonPresset(this._presset)) {
            this.order = makeNewCloudOrder();
        } else {
            this.order = [  makeNewNoodleOrder() ];
        }

        return this;
    }

    /**
     * Добавляет порядок сортировки для REST фильтра
     * 
     * @param order порядок сортировки
     * @param builder билдер сортировки или поля сортировки
     * @returns текущий REST фильтр
     */
    public addOrder(order: CloudFilterOrder, builder: ((fields: Array<string>) => void) | Array<string>) {
        if(Array.isArray(this.order)) {
            const filter = makeNewNoodleOrder();

            if(typeof builder == "function") {
                builder.call(null, filter.fields);
            } else {
                filter.fields.push(...builder);
            }

            switch(order) {
                case CloudFilterOrder.ASC:
                    filter.isAsc = true;
                break;
                case CloudFilterOrder.DESC:
                    filter.isAsc = false;
                break;
            }

            if(filter.fields.length > 0) {
                this.enable_order = true;
            }

            this.order.push(filter);
    
            return this;
        } else {
            this.order.fields.splice(0, this.order.fields.length);

            if(typeof builder == "function") {
                builder.call(null, this.order.fields);
            } else {
                this.order.fields.push(...builder);
            }

            switch(order) {
                case CloudFilterOrder.ASC:
                    this.order.direction = 'asc';
                break;
                case CloudFilterOrder.DESC:
                    this.order.direction = 'desc';
                break;
            }

            if(this.order.fields.length > 0) {
                this.enable_order = true;
            }

            return this;
        }
    }

    /**
     * Установить сортировку. Эквивалентно: flushOrder(); addOrder(...)
     * 
     * @param order сортировка
     * @param builder билдер сортировки или поля сортировки
     * @returns текущий REST фильтр
     */
    public setOrder(order: CloudFilterOrder, builder: ((fields: Array<string>) => void) | Array<string>) {
        if(Array.isArray(this.order)) {
            const filter = makeNewNoodleOrder();

            if(typeof builder == "function") {
                builder.call(null, filter.fields);
            } else {
                filter.fields.push(...builder);
            }

            switch(order) {
                case CloudFilterOrder.ASC:
                    filter.isAsc = true;
                break;
                case CloudFilterOrder.DESC:
                    filter.isAsc = false;
                break;
            }

            if(filter.fields.length > 0) {
                this.enable_order = true;
            }

            this.order = [ filter ];
    
            return this;
        } else {
            this.order.fields.splice(0, this.order.fields.length);

            if(typeof builder == "function") {
                builder.call(null, this.order.fields);
            } else {
                this.order.fields.push(...builder);
            }

            switch(order) {
                case CloudFilterOrder.ASC:
                    this.order.direction = 'asc';
                break;
                case CloudFilterOrder.DESC:
                    this.order.direction = 'desc';
                break;
            }

            if(this.order.fields.length > 0) {
                this.enable_order = true;
            }

            return this;
        }
    }

    /**
     * Выполнить опирацию построения фильтра
     * 
     * @param builder билдер для фильтра
     * @returns текущий REST фильтр
     */
    public exec(builder: (bilder: CloudCriteria) => void) {
        builder(this.query);

        return this;
    }

    /**
     * Получить прессет фильтра
     */
    public get presset(): keyof tPresset {
        return this._presset ?? "new";
    }

    /**
     * Преобразование фильтра в JSON
     * 
     * @returns JSON объект фильтра
     */
    protected toJSON(){
        const filter: any = { query: this.query };

        if(this.enable_order) {
            filter.order = this.order;
        }

        if(this.enable_pagination) {
            if(isCommonPresset(this._presset)) {
                filter.pagination = this.pagination;
            } else {
                filter.pageCount = this.pageCount;
                filter.page = this.page;
            }
        }

        return filter;
    }

    /**
     * Создать новый экземпляр фильтра
     * 
     * @returns новый экземпляр фильтра
     */
    public static init(): CloudFilter {
        return new CloudFilter();
    }
}