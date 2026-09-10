// import { TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { AuthGuard } from './auth.guard';
// import { AuthService } from '../services/auth.service';

//FIX CLAUDE d'un mauvais code généré precedemment

// describe('AuthGuard', () => {
//   let guard: AuthGuard;
//   let authServiceSpy: jasmine.SpyObj<AuthService>;
//   let routerSpy: jasmine.SpyObj<Router>;

//   beforeEach(() => {
//     authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
//     routerSpy = jasmine.createSpyObj('Router', ['navigate']);

//     TestBed.configureTestingModule({
//       providers: [
//         AuthGuard,
//         { provide: AuthService, useValue: authServiceSpy },
//         { provide: Router, useValue: routerSpy },
//       ],
//     });

//     guard = TestBed.inject(AuthGuard);
//   });

//   it('should be created', () => {
//     expect(guard).toBeTruthy();
//   });

//   it('should allow activation when authenticated', () => {
//     authServiceSpy.isAuthenticated.and.returnValue(true);
//     expect(guard.canActivate()).toBeTrue();
//   });

//   it('should block activation and redirect when not authenticated', () => {
//     authServiceSpy.isAuthenticated.and.returnValue(false);
//     expect(guard.canActivate()).toBeFalse();
//     expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
//   });
// });