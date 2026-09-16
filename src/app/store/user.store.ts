import { UserService } from './../users/user.service';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { User } from "../users/user";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { pipe, switchMap, tap } from "rxjs";
import { computed, inject } from "@angular/core";

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState<{
        users: User[],
        loading: boolean
    }>({
        users: [],
        loading: true
    }),
    withComputed((store) => {
        return {
            nbUsers: computed(() => store.users().length)
        }
    }),
    withHooks({
        onInit: (state) => {
            console.log(state)
        }
    }),
    withMethods((store) => {
        const userService = inject(UserService)
       return {
            getUsers: rxMethod<string>(
                pipe(
                   switchMap((name) => userService.getAll(name)),
                   tap((users) => {
                     patchState(store, (state) => {
                        return {
                            users,
                            loading: false
                        }
                     })
                   })
                )
            )
       }
    })
)