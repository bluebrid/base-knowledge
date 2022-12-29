import { Post } from './post.entity';
import { POST_REPOSITORY } from '../../demoCore/constants';

export const postsProviders = [
    {
        provide: POST_REPOSITORY,
        useValue: Post,
    },
];
