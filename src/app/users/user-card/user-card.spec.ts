import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCard } from './user-card';

const MOCK_USER = {
  id: 1,
  name: 'ana',
  email: 'ana@test.com'
}

describe('UserCard', () => {
  let component: UserCard;
  let fixture: ComponentFixture<UserCard>;
  let el: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCard],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCard);
    el = fixture.nativeElement
    component = fixture.componentInstance;
   // component.user = MOCK_USER
    fixture.componentRef.setInput('user', MOCK_USER)
    fixture.detectChanges()
  });

  it('affiche infos dans le tpl', () => {
     expect(el.textContent).toContain(MOCK_USER.email)
     expect(el.textContent).toContain(MOCK_USER.name)
  });
});
