import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { User } from "../core/interfaces/user";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { computed, inject } from "@angular/core";
import { UserService } from "../users/user";
import { catchError, pipe, switchMap, tap } from "rxjs";

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
    withMethods((store) => {
        const userService = inject(UserService)
        return {
            getUsers: rxMethod(
                pipe(
                    switchMap((search) => userService.getAll()),
                    tap((users) => {
                        patchState(store, (state) => {
                            return {
                                users,
                                loading: false
                            }
                        })
                    }),
                    catchError((err) => {
                        console.error(err)
                        throw err
                    })
                )
            )
        }
    })
)