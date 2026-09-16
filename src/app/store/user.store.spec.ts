import { patchState } from '@ngrx/signals';
import { UserStore } from './user.store';
import { TestBed } from '@angular/core/testing';
import { unprotected } from '@ngrx/signals/testing';

describe('User', () => {
  let store: InstanceType<typeof UserStore>

  beforeEach(() => {
    TestBed.configureTestingModule({});
    store = TestBed.inject(UserStore)
  });

  it('Savoir nbUsers lorsque users change', () => {
    patchState(unprotected(store), {
       users: [
         {
          id: 1,
          name: 'ana',
          email: 'ana@gmail.com'
         }
       ]
    })
    expect(store.nbUsers()).toBe(1)
  })
});
