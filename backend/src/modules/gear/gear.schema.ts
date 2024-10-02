import { InjectModel, Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, LeanDocument, Model } from 'mongoose'
import * as mongoose from 'mongoose'

import { UserEntity } from '../users/user.schema'

/** The class for defining the schema. */
@Schema({ timestamps: true, toObject: { virtuals: true } })
export class GearEntity {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: UserEntity.name, index: true, sparse: true })
  readonly userId: mongoose.ObjectId

  @Prop({ required: true })
  name: string

  // Cela devrait être unique pour tous les engrenages !!
  @Prop()
  key: String

  @Prop({})
  image: string

  @Prop({ required: true, index: true, sparse: true })
  date: Date
}

/** The gear mongo schema. */
export const GearSchema = SchemaFactory.createForClass(GearEntity)

/** The gear document. */
export type GearDocument = GearEntity & Document

/** The gear model. */
export type GearModel = Model<GearDocument>

// eslint-disable-next-line require-jsdoc
export const InjectGearModel = (): any => InjectModel(GearEntity.name)

/** The gear object from the database. */
export type GearObject = LeanDocument<GearDocument>
