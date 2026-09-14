import { Observable, of } from 'rxjs';
import { UserService } from './user.service';
import { Users } from './users';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from './user';

// class UserServiceMock {
//   getAll(): Observable<User[]> {
    // return of([
    //   {
    //     id: 1,
    //     name: 'ana',
    //     email: 'ana@gmail.com'
    //   }
    // ])
//   }
// }

describe('Tester UsersComponent', () => {
  let fixture: ComponentFixture<Users>;
  let component: Users;
  let el: HTMLElement;
  let spy: any

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Users],
      // providers: [{
      //   provide: UserService,
      //   useClass: UserServiceMock
      // }]
    }).compileComponents();

    const userService = TestBed.inject(UserService)
    spy = vi.spyOn(userService, 'getAll')
    spy.mockReturnValue(of([
      {
        id: 1,
        name: 'ana',
        email: 'ana@gmail.com'
      }
    ]))

    fixture = TestBed.createComponent(Users);
    component = fixture.componentInstance;
    await fixture.whenStable()
    el = fixture.nativeElement;
  });

  it('tester liste user', async () => {
    const usersEl = el.querySelectorAll('[test-users]')
    expect(usersEl).toHaveLength(1)
    expect(spy).toHaveBeenCalledTimes(1)
  })
});
