import { Observable, of } from 'rxjs';
import { Users } from './users';
import { ComponentFixture, TestBed } from "@angular/core/testing"
import { User, UsersService } from './users.service';

class MockUsersService extends UsersService {
  override getUsers(): Observable<User[]> {
    const users = [
      {
        id: 1,
        name: 'ana',
        email: 'ana@gmail.com'
      }
    ]
    this['_users'].set(users)
    return of(users)
  }
}

describe('Tester userscomponent', () => {
  let fixture: ComponentFixture<Users>
  let comp: Users
  let el: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Users],
      // providers: [
      //   {
      //     provide: UsersService,
      //     useClass: MockUsersService
      //   }
      // ]
    }).compileComponents()
    const usersService = TestBed.inject(UsersService)
     const users = [
      {
        id: 1,
        name: 'ana',
        email: 'ana@gmail.com'
      }
    ]
    vi.spyOn(usersService, 'users').mockReturnValue(users)
    vi.spyOn(usersService, 'getUsers').mockReturnValue(of(users))
    fixture = TestBed.createComponent(Users)
    await fixture.whenStable()
    comp = fixture.componentInstance
    el = fixture.nativeElement
  })

  it('Titre affiche composant', () => {
    expect(comp.title()).toBe('Utilisateurs')
    const h1 = el.querySelector('h1')
    expect(h1?.textContent).toContain(comp.title())
  })

  it('test liste utilisateur', async () =>  {
    const userCard = el.querySelectorAll('app-user-card')
    expect(userCard.length).toBe(1)
  })
})