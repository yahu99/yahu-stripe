import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  JWT_SERVICE_TOKEN,
  USER_SERVICE_TOKEN,
} from '../../shared/injection-tokens';
import { IUserService } from '../../domain/interfaces/services/user.interface';
import { UserDto } from '../dtos/user/user.dto';
import { CreateUserDto } from '../dtos/user/create-user.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SWAGGER_AUTH } from '../../shared/swagger-auth';
import { Token } from '../decorators/token.decorator';
import { IJwtService } from '../../domain/interfaces/services/jwt.interface';

@ApiTags('Users')
@ApiBearerAuth(SWAGGER_AUTH)
@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE_TOKEN)
    private readonly userService: IUserService,
    @Inject(JWT_SERVICE_TOKEN)
    private readonly jwtService: IJwtService,
  ) {}

  @Get('me')
  @ApiResponse({
    type: UserDto,
  })
  getMe(@Token() token: string): Promise<UserDto> {
    const userId = this.jwtService.getUserIdFromToken(token);
    return this.userService.getById(userId);
  }
}
