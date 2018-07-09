import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModulesMetaData } from './app.modules.metadata';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule(AppModulesMetaData).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
