import { ActivatedRouteSnapshot, RouteReuseStrategy, DetachedRouteHandle } from '@angular/router';
import { RouteStorage, RouteStorageObject } from '../interfaces/router/router-reuse.interface';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomReuseStrategy implements RouteReuseStrategy {

  storedRoutes: RouteStorage = {};

  /** 
   * Decides when the route should be stored
   * If the route should be stored, I believe the boolean is indicating to a controller whether or not to fire this.store
   * _When_ it is called though does not particularly matter, just know that this determines whether or not we store the route
   * An idea of what to do here: check the route.routeConfig.path to see if it is a path you would like to store
   * @param route This is, at least as I understand it, the route that the user is currently on, and we would like to know if we want to store it
   * @returns boolean indicating that we want to (true) or do not want to (false) store that route
   */
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // Если есть параметр с ключем "reuse" и значением "true" то маршрут будет пререиспользован.
    return route && route.routeConfig && route.routeConfig.data && route.routeConfig.data['reuse'];
  }

  /**
   * Constructs object of type `RouteStorageObject` to store, and then stores it for later attachment
   * @param route This is stored for later comparison to requested routes, see `this.shouldAttach`
   * @param handle Later to be retrieved by this.retrieve, and offered up to whatever controller is using this class
   */
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    let storedRoute: RouteStorageObject = {
        snapshot: route,
        handle: handle
    };

    if(route && route.routeConfig && route.routeConfig.path) {

      // console.log( "store:", storedRoute, "into: ", this.storedRoutes );
      // routes are stored by path - the key is the path name, and the handle is stored under it so that you can only ever have one object stored for a single path
      this.storedRoutes[route.routeConfig.path] = storedRoute;
    }
  }

  /**
   * Determines whether or not there is a stored route and, if there is, whether or not it should be rendered in place of requested route
   * @param route The route the user requested
   * @returns boolean indicating whether or not to render the stored route
   */
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // this will be true if the route has been stored before
    let canAttach: boolean = !!route.routeConfig && !!this.storedRoutes[route.routeConfig.path  || ''];

    // this decides whether the route already stored should be rendered in place of the requested route, and is the return value
    // at this point we already know that the paths match because the storedResults key is the route.routeConfig.path
    // so, if the route.params and route.queryParams also match, then we should reuse the component
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
   * Finds the locally stored instance of the requested route, if it exists, and returns it
   * @param route New route the user has requested
   * @returns DetachedRouteHandle object which can be used to render the component
   */
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // return null if the path does not have a routerConfig OR if there is no stored route for that routerConfig
    if (!route.routeConfig || !this.storedRoutes[route.routeConfig.path || '']) 
      return null;
    // console.log("retrieving", "return: ", this.storedRoutes[route.routeConfig.path || '']);

    /** returns handle when the route.routeConfig.path is already stored */
    return this.storedRoutes[route.routeConfig.path || ''].handle;
  }

  /** 
   * Определяет будет ли роут переиспользован.
   * Determines whether or not the current route should be reused
   * @param future The route the user is going to, as triggered by the router
   * @param curr The route the user is currently on
   * @returns boolean basically indicating true if the user intends to leave the current route
   */
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // console.log("deciding to reuse", "future", future.routeConfig, "current", curr.routeConfig, "return: ", future.routeConfig === curr.routeConfig);
    return future.routeConfig === curr.routeConfig;
  }

  /** 
   * This nasty bugger finds out whether the objects are _traditionally_ equal to each other, like you might assume someone else would have put this function in vanilla JS already
   * One thing to note is that it uses coercive comparison (==) on properties which both objects have, not strict comparison (===)
   * Another important note is that the method only tells you if `compare` has all equal parameters to `base`, not the other way around
   * @param base The base object which you would like to compare another object to
   * @param compare The object to compare to base
   * @returns boolean indicating whether or not the objects have all the same properties and those properties are ==
   */
  private compareObjects(base: any, compare: any): boolean {
    // loop through all properties in base object
    for (let baseProperty in base) {

      // determine if comparrison object has that property, if not: return false
      if (compare.hasOwnProperty(baseProperty)) {
        switch(typeof base[baseProperty]) {
          // if one is object and other is not: return false
          // if they are both objects, recursively call this comparison function
          case 'object':
            if ( typeof compare[baseProperty] !== 'object' || !this.compareObjects(base[baseProperty], compare[baseProperty]) ) { return false; } break;
          // if one is function and other is not: return false
          // if both are functions, compare function.toString() results
          case 'function':
            if ( typeof compare[baseProperty] !== 'function' || base[baseProperty].toString() !== compare[baseProperty].toString() ) { return false; } break;
          // otherwise, see if they are equal using coercive comparison
          default:
            if ( base[baseProperty] != compare[baseProperty] ) { return false; }
        }
      } else {
        return false;
      }
    }

    // returns true only after false HAS NOT BEEN returned through all loops
    return true;
  }
}


















/** 
 * Вторая версия сервиса
 */


// import {
//   RouteReuseStrategy,
//   ActivatedRouteSnapshot,
//   DetachedRouteHandle,
//   RouterModule,
//   Routes,
//   UrlSegment
// } from '@angular/router';


// export class CustomRouteReuseStrategy implements RouteReuseStrategy {

//   private handlers: { [key: string]: DetachedRouteHandle } = {};

//   /**
//    * Determines if this route (and its subtree) should be detached to be reused later
//    * @param route
//    */
//   shouldDetach(route: ActivatedRouteSnapshot): boolean {

//     if (!route.routeConfig || route.routeConfig.loadChildren) {
//       return false;
//     }
//     /** Whether this route should be re used or not */
//     let shouldReuse = false;
//     console.log('[router-reuse: shouldDetach] checking if this route should be re used or not', route);
//     if ( route.routeConfig.data ) {
//       route.routeConfig.data['reuse'] ? shouldReuse = true : shouldReuse = false;
//     }
    
//     return shouldReuse;
//   }

//   /**
//    * Stores the detached route.
//    */
//   store( route: ActivatedRouteSnapshot, handler: DetachedRouteHandle ): void {
//     console.log('[router-reuse: store] storing handler');
//     if ( handler ) {
//       this.handlers[this.getUrl(route)] = handler;
//     }
//   }

//   /**
//    * Determines if this route (and its subtree) should be reattached
//    * @param route Stores the detached route.
//    */
//   shouldAttach(route: ActivatedRouteSnapshot): boolean {
//     console.log('[router-reuse: shouldAttach] checking if it should be re attached');
//     return !!this.handlers[this.getUrl(route)];
//   }

//   /**
//    * Retrieves the previously stored route
//    */
//   retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
//     if (!route.routeConfig || route.routeConfig.loadChildren) {
//       return null;
//     };

//     return this.handlers[this.getUrl(route)];
//   }

//   /**
//    * Determines if a route should be reused
//    * @param future
//    * @param current
//    */
//   shouldReuseRoute(future: ActivatedRouteSnapshot, current: ActivatedRouteSnapshot): boolean {
//     /** We only want to reuse the route if the data of the route config contains a reuse true boolean */
//     let reUseUrl = false;

//     if ( future.routeConfig ) {
//       if (future.routeConfig.data ) {
//         reUseUrl = future.routeConfig.data['reuse'];
//       }
//     }

//     /**
//      * Default reuse strategy by angular assers based on the following condition
//      * @see https://github.com/angular/angular/blob/4.4.6/packages/router/src/route_reuse_strategy.ts#L67
//      */
//     const defaultReuse = (future.routeConfig === current.routeConfig);

//     // If either of our reuseUrl and default Url are true, we want to reuse the route
//     //
//     return reUseUrl || defaultReuse;
//   }

//   /**
//    * Returns a url for the current route
//    * @param route
//    */
//   getUrl(route: ActivatedRouteSnapshot): string | void {
//     /** The url we are going to return */
//     if ( route.routeConfig ) {
//       const url = route!.routeConfig!.path;
//       console.log('[router-reuse: getUrl] returning url', url);

//       return url || '';
//     }

//     return '';
//   }
// }
