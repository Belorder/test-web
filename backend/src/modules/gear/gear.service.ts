import {Injectable, NotFoundException} from '@nestjs/common'

import { stringToObjectId } from '../../utils/mongodb'

import {GearDto} from "./dtos/gear.dto";
import {GearModel, InjectGearModel} from "./gear.schema";

@Injectable()
export class GearService {
  constructor(@InjectGearModel() private readonly model: GearModel) {}

  /**
   * Find a gear by its id
   * @param id
   */
  async findById(id) {
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
