import { Module } from '@nestjs/common'

import { GearController } from './gear.controller'



@Module({
  controllers: [  GearController],
  providers: [],
  exports: [],
})
export class GearModule {}
