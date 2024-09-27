import { Module } from '@nestjs/common'

import { AuthModule } from './modules/auth/auth.module'
import { EntryModule } from './modules/entries/entry.module'
import { GlobalMongoModule } from './modules/globals/mongo.module'
import { MediaModule } from './modules/media/media.module'
import { UsersModule } from './modules/users/user.module'
import {GearModule} from "./modules/gear/gear.module";

@Module({
  imports: [GlobalMongoModule, AuthModule, UsersModule, EntryModule, MediaModule, GearModule],
})
export class AppModule {}
