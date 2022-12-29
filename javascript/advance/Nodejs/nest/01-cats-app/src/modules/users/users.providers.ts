import { User } from './user.entity';
import { USER_REPOSITORY } from '../../demoCore/constants';

export const usersProviders = [
    {
        provide: USER_REPOSITORY,
        useValue: User,
    },
];
