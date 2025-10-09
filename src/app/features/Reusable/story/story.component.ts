import { Component, inject } from '@angular/core';
import { SharedService } from '../../../shared/shared service/shared.service';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Post } from '../../../core/domain/post.interface';
import { ToastService } from '../../../core/data/toast/toast.service';
import { MainService } from '../../data/main.service';

@Component({
  selector: 'app-story',
  imports: [AsyncPipe, DatePipe, CommonModule],
  templateUrl: './story.component.html',
  styleUrl: './story.component.css'
})
export class StoryComponent {

  private route = inject(ActivatedRoute);
  private toast = inject(ToastService);
  private mainService = inject(MainService);
  constructor(public sharedService: SharedService) { }

  isPublished$ = this.route.data.pipe(
    map(data => data['isPublished'])
  );
  readingStory!: Post | null;
  ngOnInit() {
    this.sharedService.story$.subscribe({
      next: (res) => {
        this.readingStory = res;
      }
    })
  }

  get dp() {
    return 'https://avatar.iran.liara.run/public';
  }

  publishStory() {
    if (!this.readingStory) {
      this.toast.showError('Story not selected!');
      return;
    }

    if (confirm('Are you sure to publish this story??')) {

      this.mainService.publishStory(this.readingStory._id).subscribe({

        next: (res) => {
          if (res.status) {
            this.toast.showSuccess(res.message);
            this.sharedService.openStory(res.data);
          }
        }
      })

    }
  }
}
