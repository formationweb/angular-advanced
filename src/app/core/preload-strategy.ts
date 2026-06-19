import { Service } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

type CustomNavigator = {
    connection: {
        effectiveType: '2g' | '3g' | '4g'
    }
} | undefined

@Service()
export class PreloadStrategy implements PreloadingStrategy {
    preload(route: Route, load: () => Observable<any>): Observable<any> {
        // pas compatible avec tous les navigateurs
        const connection = (navigator as any as CustomNavigator)?.connection
        if (!connection) {
            return of(null)
        }
        if (connection.effectiveType == '2g') {
            console.log('connection too slow')
            return of(null)
        }
        return load()
    }
}
