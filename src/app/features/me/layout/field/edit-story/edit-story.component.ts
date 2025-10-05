import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Post } from '../../../../../core/domain/post.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MainService } from '../../../../data/main.service';

@Component({
  selector: 'app-edit-story',
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatDialogContent, MatFormFieldModule, MatInputModule, MatIcon],
  templateUrl: './edit-story.component.html',
  styleUrl: './edit-story.component.css'
})
export class EditStoryComponent {

  storyForm: FormGroup;
  dialogRef = inject(MatDialogRef<EditStoryComponent>);
  fb = inject(FormBuilder);
  selectedFile: File | null = null;
  previewUrl: string;
  formData = new FormData();
  mainService = inject(MainService);
  btnDisable: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Post) {

    this.storyForm = this.fb.group({
      title: [this.data?.title || '', Validators.required],
      genre: [this.data?.genre || '', Validators.required],
      content: [this.data?.content || '', Validators.required]
    });

    this.previewUrl = this.data?.imageUrl?.url || '';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.selectedFile = input.files[0];

    // Show preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit() {
    if (this.storyForm.invalid) return;

    const updatedData = {
      ...this.storyForm.value,
      storyImage: this.selectedFile,
      storyId: this.data._id
    };
    this.dialogRef.close(updatedData);
  }

  close() {
    this.dialogRef.close();
  }
}
