import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';
import { RouteStorage, RouteStorageObject } from '../interfaces/router/router-reuse.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomReuseStrategy implements RouteReuseStrategy {

  storedRoutes: RouteStorage = {};

  /** 
   * Определяет, когда маршрут должен быть сохранен
   * Если маршрут должен быть сохранен, я считаю, что булево значение указывает контроллеру, следует ли вызывать this.store
   * То, когда это вызывается, не имеет особого значения, просто знайте, что это определяет, сохранять маршрут или нет
   * Идея того, что здесь делать: проверьте route.routeConfig.path, чтобы увидеть, нужно ли сохранить его
   * @param route Это, по крайней мере, так, как я понимаю, маршрут, на котором находится пользователь, и мы хотим знать, нужно ли его сохранить
   * @returns булево значение, указывающее, нужно ли (true) или нет (false) сохранять этот маршрут
   */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // Если есть параметр с ключем "reuse" и значением "true", то маршрут будет пререиспользован.
    return route && route.routeConfig && route.routeConfig.data && route.routeConfig.data['reuse'];
  }

  /**
   * Создает объект типа `RouteStorageObject` для сохранения и затем сохраняет его для последующего использования
   * @param route Это сохраняется для последующего сравнения с запрошенными маршрутами, см. `this.shouldAttach`
   * @param handle Затем извлекается этим this.retrieve и предлагается любому контроллеру, использующему этот класс
   */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    let storedRoute: RouteStorageObject = {
        snapshot: route,
        handle: handle
    };

    if(route && route.routeConfig && route.routeConfig.path) {

      // console.log( "store:", storedRoute, "into: ", this.storedRoutes );
      // маршруты хранятся по пути - ключ - это имя пути, а дескриптор хранится под ним, чтобы вы могли иметь только один объект, хранящийся для одного пути
      this.storedRoutes[route.routeConfig.path] = storedRoute;
    }
  }

  /**
   * Определяет, есть ли сохраненный маршрут и, если да, следует ли его отображать вместо запрошенного маршрута
   * @param route Запрошенный пользователем маршрут
   * @returns булево значение, указывающее, следует ли отображать сохраненный маршрут
   */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // это будет true, если маршрут уже был сохранен ранее
    let canAttach: boolean = !!route.routeConfig && !!this.storedRoutes[route.routeConfig.path  || ''];

    // это решает, следует ли отображать уже сохраненный маршрут вместо запрошенного маршрута, и является возвращаемым значением
    // на этом этапе мы уже знаем, что пути совпадают, потому что ключ storedResults - это route.routeConfig.path
    // поэтому, если параметры маршрута и queryParams маршрута также совпадают, то мы должны использовать компонент повторно
    if (canAttach) {
      let willAttach: boolean = true;
      // console.log("param comparison:");
      // console.log(this.compareObjects(route.params, this.storedRoutes[route!.routeConfig!.path  || ''].snapshot.params));
      // console.log("query param comparison");
      // console.log(this.compareObjects(route.queryParams, this.storedRoutes[route!.routeConfig!.path  || ''].snapshot.queryParams));

      let paramsMatch: boolean = this.compareObjects(route.params, this.storedRoutes[route!.routeConfig!.path  || ''].snapshot.params);
      // Пока что сопоставления по qp не будет !!!
      let queryParamsMatch: boolean = true // this.compareObjects(route.queryParams, this.storedRoutes[route!.routeConfig!.path  || ''].snapshot.queryParams);

      // console.log("deciding to attach...", route, "does it match?", this.storedRoutes[route!.routeConfig!.path  || ''].snapshot, "return: ", paramsMatch && queryParamsMatch);
      return paramsMatch && queryParamsMatch;
    } else {
      return false;
    }
  }

  /** 
   * Находит локально сохраненный экземпляр запрошенного маршрута, если он существует, и возвращает его
   * @param route Новый маршрут, который запросил пользователь
   * @returns DetachedRouteHandle объект, который можно использовать для отображения компонента
   */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // возвращайте null, если у пути нет routerConfig ИЛИ если нет сохраненного маршрута для этого routerConfig
    if (!route.routeConfig || !this.storedRoutes[route.routeConfig.path || '']) 
      return null;
    // console.log("retrieving", "return: ", this.storedRoutes[route.routeConfig.path || '']);

    /** возвращает handle, когда route.routeConfig.path уже сохранен */
    return this.storedRoutes[route.routeConfig.path || ''].handle;
  }

  /** 
   * Определяет, следует ли повторно использовать текущий маршрут
   * @param future Маршрут, на который пользователь собирается перейти, как вызванный маршрутизатором
   * @param curr Маршрут, на котором пользователь находится в данный момент
   * @returns булево значение, в основном указывающее true, если пользователь собирается покинуть текущий маршрут
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // console.log("deciding to reuse", "future", future.routeConfig, "current", curr.routeConfig, "return: ", future.routeConfig === curr.routeConfig);
    return future.routeConfig === curr.routeConfig;
  }

  /** 
   * Этот зловредный тип узнает, равны ли объекты _традиционно_ друг другу, как вы, возможно, предположили бы, что кто-то другой уже включил эту функцию в чистый JS
   * Важно отметить, что здесь используется сравнение с принудительным преобразованием (==) для свойств, которые есть и у обоих объектов, а не строгое сравнение (===)
   * Еще одно важное замечание заключается в том, что метод говорит только о том, имеет ли `compare` все равные параметры `base`, а не наоборот
   * @param base Базовый объект, с которым вы хотели бы сравнить другой объект
   * @param compare Объект для сравнения с базой
   * @returns булево значение, указывающее, имеют ли объекты одни и те же свойства, и эти свойства ==
   */
  private compareObjects(base: any, compare: any): boolean {
    // пройдите по всем свойствам в базовом объекте
    for (let baseProperty in base) {

      // определите, имеет ли объект сравнения это свойство, если нет: верните false
      if (compare.hasOwnProperty(baseProperty)) {
        switch(typeof base[baseProperty]) {
          // если один объект, а другой - нет: вернуть false
          // если они оба объекты, рекурсивно вызывайте эту функцию сравнения
          case 'object':
            if ( typeof compare[baseProperty] !== 'object' || !this.compareObjects(base[baseProperty], compare[baseProperty]) ) { return false; } break;
          // если один объект - функция, а другой - нет: вернуть false
          // если оба являются функциями, сравните результаты function.toString()
          case 'function':
            if ( typeof compare[baseProperty] !== 'function' || base[baseProperty].toString() !== compare[baseProperty].toString() ) { return false; } break;
          // в противном случае посмотрите, равны ли они с использованием сравнения с принудительным преобразованием
          default:
            if ( base[baseProperty] != compare[baseProperty] ) { return false; }
        }
      } else {
        return false;
      }
    }

    // возвращает true только после того, как false НЕ БЫЛ возвращен во всех циклах
    return true;
  }
}
