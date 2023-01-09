import { Body, Controller, Get, Param, Post, UseGuards, UseInterceptors } from "../common";
import { Roles } from "../catCommon/decorators/roles.decorator";
import { RolesGuard } from "../catCommon/guards/roles.guard";
import { ParseIntPipe } from "../catCommon/pipes/parse-int.pipe";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "./interfaces/cat.interface";
import { DemoLoggingInterceptor } from "./interceptors/demo.interceptor";
import { TimeoutInterceptor } from "./interceptors/timeout.interceptor";

@UseGuards(RolesGuard)
@Controller(["cats", "index"])
@UseInterceptors(DemoLoggingInterceptor, TimeoutInterceptor)
export class CatsController {
  // private readonly catsService: CatsService;
  // constructor(catsService: CatsService) {
  //   this.catsService = catsService
  // }
  // 这个写法是上面四行代码的简写
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles("admin")
  async create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Get(":id")
  findOne(
    @Param("id", new ParseIntPipe())
    id: number
  ) {
    return this.catsService.findById(id);
    // get by ID logic
  }
}
