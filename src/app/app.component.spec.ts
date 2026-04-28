import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      // Como o nosso app carrega o ContatosComponent (que usa o ContatoService),
      // precisamos injetar o provedor de rotas HTTP no ambiente de testes também!
      providers: [provideHttpClient()] 
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Removemos os testes antigos do 'title' pois eles não fazem mais parte do nosso escopo.
});