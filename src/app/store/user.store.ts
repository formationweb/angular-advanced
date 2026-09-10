import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { User } from "../core/interfaces/user";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { computed, inject } from "@angular/core";
import { UserPayload, UserService } from "../users/user";
import { catchError, map, pipe, switchMap, tap } from "rxjs";

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
            ),
            createUser: rxMethod<UserPayload>(
               pipe(
                    switchMap((payload) => userService.createUser(payload)),
                    tap((user) => {
                        patchState(store, (state) => ({
                            users: [...state.users, user]
                        }))
                    })
               )
            ),
            deleteUser: rxMethod<number>(
                pipe(
                    switchMap((id) => userService.deleteUser(id).pipe(map(() => id))),
                    tap((id) => {
                        patchState(store, (state) => ({
                            users: state.users.filter(user => user.id != id)
                        }))
                    })
                )
            )
        }
    })
)