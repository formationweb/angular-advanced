import { Mytest } from './mytest';
import { ComponentFixture, TestBed } from "@angular/core/testing"

describe('Tester MyTestComponent', () => {
  let fixture: ComponentFixture<Mytest>
  let comp: Mytest
  let el: HTMLElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mytest]
    }).compileComponents()
    fixture = TestBed.createComponent(Mytest)
    comp = fixture.componentInstance
    fixture.detectChanges()
    el = fixture.nativeElement
  })

  it('propriété title est affichée', () => {
    const h1 = el.querySelector('h1')
    expect(comp.title()).toBe('Mon App')
    //expect(h1?.textContent).toContain(comp.title())
    expect(el?.textContent).toContain(comp.title())
  })
})