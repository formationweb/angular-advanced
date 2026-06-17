import { Users } from './users';
import { ComponentFixture, TestBed } from "@angular/core/testing"

describe('Tester userscomponent', () => {
  let fixture: ComponentFixture<Users>
  let comp: Users
  let el: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Users]
    }).compileComponents()
    fixture = TestBed.createComponent(Users)
    fixture.detectChanges()
    comp = fixture.componentInstance
    el = fixture.nativeElement
  })

  it('Titre affiche composant', () => {
    expect(comp.title()).toBe('Utilisateurs')
    const h1 = el.querySelector('h1')
    expect(h1?.textContent).toContain(comp.title())
  })
})