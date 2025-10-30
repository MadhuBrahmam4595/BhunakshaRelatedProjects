import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMap } from './upload-map';

describe('UploadMap', () => {
  let component: UploadMap;
  let fixture: ComponentFixture<UploadMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
