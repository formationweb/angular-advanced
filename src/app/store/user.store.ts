import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { User } from "../core/interfaces/user";

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState<{
        users: User[],
        loading: boolean
    }>({
        users: [],
        loading: false
    }),
    withMethods((store) => {
        return {
            getUsers() {
                patchState(store, (state) => ({
                    users: [
                        {
                            id: 1,
                            name: 'test',
                            email: 'email@aa.net'
                        }
                    ],
                    loading: true
                }))
            }
        }
    })
)