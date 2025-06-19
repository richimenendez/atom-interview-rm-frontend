import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule
      ],
      declarations: [ ButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the text passed as input', () => {
    // Arrange
    const testText = 'Botón de prueba';
    component.text = testText;
    
    // Act
    fixture.detectChanges();
    
    // Assert
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent).toContain(testText);
  });

  it('should emit clicked event when button is clicked', () => {
    // Arrange
    spyOn(component.clicked, 'emit');
    const buttonElement = fixture.nativeElement.querySelector('button');
    
    // Act
    buttonElement.click();
    
    // Assert
    expect(component.clicked.emit).toHaveBeenCalled();
  });

  it('should not emit clicked event when button is disabled', () => {
    // Arrange
    component.disabled = true;
    spyOn(component.clicked, 'emit');
    fixture.detectChanges();
    
    const buttonElement = fixture.nativeElement.querySelector('button');
    
    // Act
    buttonElement.click();
    
    // Assert
    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should not emit clicked event when button is loading', () => {
    // Arrange
    component.loading = true;
    spyOn(component.clicked, 'emit');
    fixture.detectChanges();
    
    const buttonElement = fixture.nativeElement.querySelector('button');
    
    // Act
    buttonElement.click();
    
    // Assert
    expect(component.clicked.emit).not.toHaveBeenCalled();
  });

  it('should show spinner when loading is true', () => {
    // Arrange
    component.loading = true;
    component.text = 'Cargando...';
    
    // Act
    fixture.detectChanges();
    
    // Assert
    const spinnerElement = fixture.nativeElement.querySelector('mat-spinner');
    expect(spinnerElement).toBeTruthy();
  });

  it('should show icon when icon is provided and not loading', () => {
    // Arrange
    component.icon = 'add';
    component.text = 'Agregar';
    component.loading = false;
    
    // Act
    fixture.detectChanges();
    
    // Assert
    const iconElement = fixture.nativeElement.querySelector('mat-icon');
    expect(iconElement).toBeTruthy();
    expect(iconElement.textContent).toContain('add');
  });

  it('should not show icon when loading is true', () => {
    // Arrange
    component.icon = 'add';
    component.loading = true;
    
    // Act
    fixture.detectChanges();
    
    // Assert
    const iconElement = fixture.nativeElement.querySelector('mat-icon');
    expect(iconElement).toBeFalsy();
  });

  it('should have disabled attribute when disabled is true', () => {
    // Arrange
    component.disabled = true;
    
    // Act
    fixture.detectChanges();
    
    // Assert
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.hasAttribute('disabled')).toBe(true);
  });

  it('should have disabled attribute when loading is true', () => {
    // Arrange
    component.loading = true;
    
    // Act
    fixture.detectChanges();
    
    // Assert
    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.hasAttribute('disabled')).toBe(true);
  });
});
