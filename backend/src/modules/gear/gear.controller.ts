import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { plainToClass } from 'class-transformer'

import { InjectUser } from '../auth/decorators/user.decorator'
import { User, UserRole } from '../users/interfaces/user.interface'
import { GearService } from './gear.service'
import {GearDto} from "./dtos/gear.dto";
import {UserService} from "../users/user.service";
import { GearModel, InjectGearModel } from './gear.schema'

const stringToObjectId = require('src/utils/mongodb')

@Controller('api/v1/MyTools')
@ApiTags('gear')
export class GearController {
  /**
   * Constructor.
   * @param gearService
   */
  constructor(@InjectGearModel() protected readonly model: GearModel, protected readonly gearService: GearService, protected readonly userService: UserService) {}

  /**
   * Creates a new gear.
   * @param user
   * @param request
   */
  @Post()
  @ApiOperation({ operationId: 'createGear', description: 'Creates a new gear' })
  @ApiCreatedResponse({ type: GearDto })
  async createGear(@InjectUser() user: User, @Body() request: GearDto): Promise<GearDto | boolean> {
    const userId = user.id
    const userFromDatabase = await this.userService.getOne(userId)
    const isAdmin = userFromDatabase.role === UserRole.Admin

    // Only admin can create a gear
    if (isAdmin == false) {
      return false
    }

    // IMPORTANT!! make sure we don't create another gear with same key
    var existant = this.getGear({ key: request.key } as any)
    if (existant) {
      throw new NotFoundException('Another gear exists with the same key')
    }

    const created = await this.model.create({
      id: request.id,
      userId: stringToObjectId(request.userId),
      name: request.name,
      key: request.key,
      image: request.image,
      date: request.date,
    })
    let gear = created?.toObject()

    return plainToClass(GearDto, gear)
  }

  /**
   * Geta specific gear
   * @param request
   */
  @Get()
  @ApiOperation({ operationId: 'getGear', description: 'Gets a specific gear' })
  @ApiOkResponse({ type: GearDto })
  async getGear(@Query() request: GearDto): Promise<GearDto> {
    const id = request.id
    const gear = await this.gearService.findById(id)

    return plainToClass(GearDto, gear)
  }
}
