import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCard } from './user-card';
import { inputBinding } from '@angular/core';

describe('UserCard', () => {
  let component: UserCard;
  let fixture: ComponentFixture<UserCard>;
  let el: HTMLElement

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
    el = fixture.nativeElement
  });

  it('nom et email dans le template', () => {
    expect(el.textContent).toContain('ana');
    expect(el.textContent).toContain('ben@gmail.com');
  });

  // it('Tester le output', () => {
  //    let emitId: null | number = null
  //    const buttonEl = el.querySelector('button')
     
  //    const onDelete = component.onDelete
  //    onDelete.subscribe((id) => {
  //     emitId = id
  //    })

  //    buttonEl?.click()

  //    expect(emitId).toBe(1)
  //    //buttonEl?.dispatchEvent(new Event('click'))
  // })

   it('Tester le output', () => {
     const spy = vi.spyOn(component.onDelete, 'emit')
     const buttonEl = el.querySelector('button')
     
     buttonEl?.click()

     expect(spy).toHaveBeenCalledWith(1)
  })
});