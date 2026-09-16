import { UserPayload, UserService } from './../users/user.service';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { User } from "../users/user";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { catchError, map, pipe, switchMap, tap } from "rxjs";
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
            ),
            createUser: rxMethod<UserPayload>(
                pipe(
                     switchMap((payload) => userService.create(payload)),
                     tap((user) => {
                        patchState(store, () => ({
                            users: [...store.users(), user]
                        }))
                     })
                )
            ),
            deleteUser: rxMethod<number>(
                pipe(
                    switchMap((id) => userService.delete(id).pipe(
                        map(() => id)
                    )),
                    tap((id) => {
                        patchState(store, () => ({
                            users: store.users().filter(user => user.id != id)
                        }))
                     }),
                     catchError((err) => {
                        console.log(err)
                        throw err
                     })
                )
            )
       }
    })
)