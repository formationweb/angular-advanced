import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCard } from './user-card';
import { inputBinding } from '@angular/core';

describe('UserCard', () => {
  let component: UserCard;
  let fixture: ComponentFixture<UserCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCard],
    }).compileComponents();

    fixture = TestBed.createComponent(UserCard, {
      bindings: [
        inputBinding('user', () => ({
          id: 1,
          name: 'ana',
          email: 'ben@gmail.com',
        })),
      ],
    });
    component = fixture.componentInstance;
    // fixture.componentRef.setInput('user', {
    //   id: 1,
    //   name: 'ana',
    //   email: 'ben@gmail.com'
    // })
    fixture.detectChanges();
  });

  it('nom et email dans le template', () => {
    const el = fixture.nativeElement;
    expect(el.textContent).toContain('ana');
    expect(el.textContent).toContain('ben@gmail.com');
  });
});
