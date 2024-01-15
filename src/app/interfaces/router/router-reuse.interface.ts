import { ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";

export interface RouteStorageObject {
  snapshot: ActivatedRouteSnapshot;
  handle: DetachedRouteHandle;
}

export interface RouteStorage { 
  [key: string]: RouteStorageObject 
}