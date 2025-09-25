import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

describe('App Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    // Arrange
    const fixture = TestBed.createComponent(App);

    // Act
    const app = fixture.componentInstance;

    // Assert
    expect(app).toBeTruthy();
  });

  it('should reset content when resetContent() is called', () => {
    // Arrange
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.content = 'Some content';
    app.error = 'Some error';
    app.duration = 42;
    app.progress = 80;
    app.loading = true;

    // Act
    app.resetContent();

    // Assert
    expect(app.content).toBe('');
    expect(app.error).toBeNull();
    expect(app.duration).toBe(0);
    expect(app.progress).toBe(0);
    expect(app.loading).toBe(false);
  });

  it('should update style and reset content when onStyleChange is called', () => {
    // Arrange
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.content = 'old content';

    // Act
    app.onStyleChange('cinematic');

    // Assert
    expect(app.style).toBe('cinematic');
    expect(app.content).toBe('');
  });

  it('should update mode and reset content when onModeChange is called', () => {
    // Arrange
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    // Act
    app.onModeChange('direct');

    // Assert
    expect(app.mode).toBe('direct');
    expect(app.content).toBe('');
  });
});
