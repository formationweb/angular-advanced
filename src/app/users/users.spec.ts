import { Observable, of } from 'rxjs';
import { Users } from './users';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from '../core/interfaces/user';
import { UserService } from './user';

// class UserServiceMock {
//     getAll(): Observable<User[]> {
//         return of([
//             {
//                 id: 1,
//                 name: 'ana',
//                 email: 'ana@gmail.com'
//             }
//         ])
//     }
// }

describe('Tester MyTestComponent', () => {
  let fixture: ComponentFixture<Users>;
  let comp: Users;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Users],
    //   providers: [
    //     {
    //         provide: UserService,
    //         useClass: UserServiceMock
    //     }
    //   ]
    }).compileComponents();

    const usersService = TestBed.inject(UserService)
    vi.spyOn(usersService, 'getAll').mockReturnValue(of([
        {
            id: 1,
            name: 'ana',
            email: 'ana@gmail.com'
        }
    ]))

    fixture = TestBed.createComponent(Users);
    comp = fixture.componentInstance;
    await fixture.whenStable();
    el = fixture.nativeElement;
  });

  it('tester liste utilisateur', async () => {
    const userEl = el.querySelectorAll('[test-users]');
    expect(userEl).toHaveLength(1);
  });
});
