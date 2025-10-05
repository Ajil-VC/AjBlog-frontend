import { Component, inject } from '@angular/core';
import { PostCardComponent } from "./post-card/post-card.component";
import { CommonModule } from '@angular/common';
import { MainService } from '../data/main.service';
import { Post } from '../../core/domain/post.interface';
import { Subject } from 'rxjs';
import { SharedService } from '../../shared/shared service/shared.service';
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
    selector: 'app-landpage',
    imports: [PostCardComponent, CommonModule, PaginationComponent],
    templateUrl: './landpage.component.html',
    styleUrl: './landpage.component.css'
})
export class LandpageComponent {

    private destroy$ = new Subject<void>();
    sharedService = inject(SharedService);

    constructor(private _mainService: MainService) { }
    stories: Post[] = [];

    currentPage: number = 1;
    totalPages: number = 1;
    searchQuery: string = '';

    ngOnInit() {

        this.refreshPage();
        this.sharedService.searchQuery$.subscribe({
            next: (res) => {
                this.searchQuery = res;
                this.refreshPage();
            }
        })
    }

    refreshPage(page: number = 1) {

        this._mainService.getStories(this.searchQuery, page).subscribe({
            next: (res) => {

                if (res.status) {
                    this.stories = res.data;
                    this.totalPages = res.totalPages;
                }
            }
        });
    }

    onPageChange(page: number): void {
        if (this.currentPage === page) return;
        this.currentPage = page;
        this.refreshPage(this.currentPage);
    }


    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
