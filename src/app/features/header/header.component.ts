import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/Auth service/auth.service';
import { User } from '../../core/domain/user.interface';
import { CommonModule } from '@angular/common';
import { genresData } from '../../core/domain/types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, startWith, Subject, takeUntil } from 'rxjs';
import { SharedService } from '../../shared/shared service/shared.service';

@Component({
    selector: 'app-header',
    imports: [RouterModule, CommonModule, RouterLink, ReactiveFormsModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {

    private destroy$ = new Subject<void>();
    public user: User | null = null;
    genre = genresData;

    searchControl = new FormControl('');
    sharedService = inject(SharedService);
    route = inject(Router)

    constructor(public authService: AuthService) { }
    ngOnInit() {
        this.authService.$user.subscribe({
            next: (res) => {
                this.user = res;
            }
        })
    }

    searchTerm$ = this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
    ).subscribe(searchTerm => {
        if (this.route.url === '/me') {
            this.route.navigate(['']);
        }
        this.sharedService.searchStory(searchTerm || '');
    });

    refreshPage() {
        this.sharedService.searchStory('');
    }

    ngOnDestroy() {

        this.destroy$.next();
        this.destroy$.complete();
    }
}
