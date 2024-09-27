import {Injectable, NotFoundException} from '@nestjs/common'

import { stringToObjectId } from '../../utils/mongodb'

import {GearDto} from "./dtos/gear.dto";
import {GearModel, InjectGearModel} from "./gear.schema";

@Injectable()
export class GearService {
  constructor(@InjectGearModel() private readonly model: GearModel) {}

  /**
   * Crates a new gear in the database
   * @param params
   */
  async createOne(params: GearDto): Promise<GearDto> {
    const created = await this.model.create({
      id: params.id,
      userId: stringToObjectId(params.userId),
      name: params.name,
      image: params.image,
      date: params.date,
    })

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return created?.toObject()
  }

  /**
   * Find a gear by its id
   * @param id
   */
  async findById(id: string): Promise<GearDto | undefined> {
    const gear = await this.model.findById(stringToObjectId(id))

    if (!gear.id) {
      throw new NotFoundException('Not found with id "' + stringToObjectId(id))
      return undefined
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return gear?.toObject() ?? undefined
  }
}
