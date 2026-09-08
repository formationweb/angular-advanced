import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCard } from './user-card';

describe('UserCard', () => {
  let component: UserCard;
  let fixture: ComponentFixture<UserCard>;
  let el: HTMLElement

  const mock = {
      id: 1,
      name: 'ana',
      email: 'ana@gmail.com'
    }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCard],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCard);
    component = fixture.componentInstance;
    el = fixture.nativeElement
    //component.user = mock
    fixture.componentRef.setInput('user', mock)
    fixture.detectChanges()
  });

  it('tester la carte', () => {
    expect(el.textContent).toContain(mock.email)
    expect(el.textContent).toContain(mock.name)
  });
});
