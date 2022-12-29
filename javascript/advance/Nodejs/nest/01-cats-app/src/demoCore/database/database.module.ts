import { Module } from '../../common';

import { databaseProviders } from './database.providers';

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DatabaseModule { }
