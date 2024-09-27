import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Exclude, Expose, Transform } from 'class-transformer'

@Exclude()
/** Gear dto */
export class GearDto {
    @ApiProperty({ description: "Gear's id.", example: '6179d0975632c1470ebd22cb' })
    @Expose()
    readonly id: string

    @ApiProperty({ description: 'Id of the user that has created the gear.', example: '6179d0975632c1470ebd22ca' })
    @Transform(({ value }) => value?._id?.toString() ?? value?.toString())
    @Expose()
    readonly userId: string

    @ApiProperty({ description: 'Name of the gear', example: 'Pan' })
    @Expose()
    readonly name: string

    @ApiPropertyOptional({
        description: 'URI of the attached image',
        example: '/api/v1/media/617ebbfb27b32a444bf05ec5',
    })
    @Transform(({ value }) => (value ? `/api/v1/media/${value}` : undefined), {
        toPlainOnly: true,
    })
    @Expose()
    readonly image?: string

    @ApiProperty({ description: 'Date when the gear was added.' })
    @Expose()
    readonly date: Date
}
