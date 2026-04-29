import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // <-- Importação necessária

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideHttpClient(),
        // Precisamos fornecer um roteador vazio para que o router-outlet e routerLink funcionem no teste
        provideRouter([]) 
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Testes de título removidos conforme solicitado, mantendo o foco na criação do componente.
});