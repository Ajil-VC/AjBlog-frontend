import { CommonModule } from '@angular/common';
import { Component, Inject, inject, ViewChild, viewChild } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { genresData } from '../../../../core/domain/types';
import { ToastService } from '../../../../core/data/toast/toast.service';
import { MainService } from '../../../data/main.service';
import { Post } from '../../../../core/domain/post.interface';
import { SharedService } from '../../../../shared/shared service/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { EditStoryComponent } from './edit-story/edit-story.component';

@Component({
  selector: 'app-field',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './field.component.html',
  styleUrl: './field.component.css'
})
export class FieldComponent {

  @ViewChild('form') form!: NgForm;
  dialogRef = inject(MatDialog);
  constructor(private toast: ToastService, private mainService: MainService, private shared: SharedService) { }

  activeTab: 'create' | 'posts' = 'posts';
  genre = genresData;

  newPost = { title: '', content: '', genre: '' };
  posts = [
    { title: 'My first post', content: 'Hello blog!', author: 'Sachin', date: new Date() }
  ];

  selectedFile: File | null = null;

  stories: Post[] = [];
  ngOnInit() {

    this.mainService.getAuthorsStories().subscribe({
      next: (res) => {

        if (res.status) {
          this.stories = res.data;
        }
      }
    })
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onCreatePost() {
    if (!this.newPost.title.trim()) {
      this.toast.showError('Please give a title to the new story.');
      return;
    }
    if (!this.newPost.content) {
      this.toast.showError("Content cannot be empty.");
      return;
    }
    if (!this.newPost.genre) {
      this.toast.showError('Please select a genre from the list.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.newPost.title);
    formData.append('content', this.newPost.content);
    formData.append('genre', this.newPost.genre);
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.mainService.createStory(formData).subscribe({
      next: (res) => {
        if (res.status) {
          this.stories.unshift(res.data);
          this.newPost = { title: '', content: '', genre: '' };
          this.activeTab = 'posts';
        }
      }
    });

  }

  openStory(story: Post) {
    this.shared.openStory(story);
  }

  editStory(story: Post) {

    const dialog = this.dialogRef.open(EditStoryComponent, {
      width: '600px',
      data: story
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {

        const formData = new FormData();

        formData.append('title', result.title);
        formData.append('content', result.content);
        formData.append('genre', result.genre);
        formData.append('storyId', result.storyId);
        if (result.storyImage) {
          formData.append('image', result.storyImage);
        }

        this.mainService.updateStory(formData).subscribe({
          next: (res) => {
            if (res.status) {
              const ind = this.stories.findIndex(s => s._id === res.data._id);
              this.stories[ind] = res.data;
              this.toast.showSuccess(res.message)
            }
          },
          error: () => {
            this.toast.showError('Couldnt update the story.');
          }
        })

      }
    });

  }


}
