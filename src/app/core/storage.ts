import { isPlatformBrowser } from "@angular/common";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Storage {
    private platformId = inject(PLATFORM_ID)
    private keys = new Map()

    getItem(key: string): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(key)
        }
        return this.keys.get(key)
    }

    setItem(key: string, val: string) {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.setItem(key, val)
        }
        return this.keys.set(key, val)
    }
}