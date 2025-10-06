import { Component, Input } from '@angular/core';
import { Post } from '../../../core/domain/post.interface';
import { SharedService } from '../../../shared/shared service/shared.service';

@Component({
    selector: 'app-post-card',
    imports: [],
    templateUrl: './post-card.component.html',
    styleUrl: './post-card.component.css'
})
export class PostCardComponent {

    @Input() story!: Post;

    constructor(private shared: SharedService) { }
    get storyImage() {
        if (this.story.imageUrl?.url) {
            return this.story.imageUrl.url;
        }
        return 'assets/images/default_story_thumbnail.jpg';
    }
    get dp() {
        return 'https://avatar.iran.liara.run/public';
    }
    ngOnInit() {
    }

    openStory() {
        this.shared.openStory(this.story);
    }
}
