import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenlayersMap } from './openlayers-map';

describe('OpenlayersMap', () => {
  let component: OpenlayersMap;
  let fixture: ComponentFixture<OpenlayersMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenlayersMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenlayersMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
