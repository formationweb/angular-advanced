import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { Observable, of } from "rxjs";

type CustomNavigator = {
    connection: {
        effectiveType: '2g' | '3g' | '4g'
    }
} | undefined

@Injectable({
    providedIn: 'root'
})
export class PreloadStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        const connection = (navigator as any as CustomNavigator)?.connection
        if (!connection) {
            return of(null)
        }
        if (connection.effectiveType == '2g') {
             return of(null)
        }
        return load()
    }
}