import { Controller, Get, Post, Put, Param, Body, Delete, Query, UseGuards } from '@nestjs/common';
import { BarService } from './bars.service';
import { ReviewService } from '../review/review.service';
import { CreateBarDto } from './models/create-bar.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';


@Controller('bars')
export class BarController {
    constructor(private barsService: BarService, private reviewService: ReviewService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findActives(@Query() query) {
        return this.barsService.findActives(query.limit | 0);
    }

    @UseGuards(JwtAuthGuard)
    @Get('all')
    async findAll() {
        return this.barsService.findAll();
    }
    
    @Get('bypopularity')
        async findPopulars() {
            return this.barsService.findPopulars();
        }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param() param) {
        return this.barsService.findOne(param);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id/reviews')
    async findReviews(@Param() param, @Query() query) {
        return this.reviewService.findBarReviews(param.id, query.limit | 0);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() datas: CreateBarDto) {
        return this.barsService.addBar(datas);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Body() datas: CreateBarDto, @Param() param) {
        return this.barsService.updateBar(datas, param.id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param() param) {
        return this.barsService.deleteBar(param.id)
    }
}
