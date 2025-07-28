import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisResenas } from './mis-resenas';

describe('MisResenas', () => {
  let component: MisResenas;
  let fixture: ComponentFixture<MisResenas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisResenas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisResenas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
