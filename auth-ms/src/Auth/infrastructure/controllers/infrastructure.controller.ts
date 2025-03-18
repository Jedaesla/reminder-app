import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { UuidService } from '../services/uuid.service';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateUserInfraDto } from '../dto/create-user.dto';
import { ApplicationInterface } from 'src/Auth/application/application.interface';
import { JwtInfrastructureService } from '../services/jwt.service';
import { PasswordHashService } from '../services/password-hash.service';

@Controller()
export class InfrastructureController {
  constructor(
    private readonly application: ApplicationInterface,
    private readonly uuidService: UuidService,
    private readonly jwtService: JwtInfrastructureService,
    private readonly passwordHashService: PasswordHashService,
  ) {}

  @MessagePattern({ cmd: 'create_user' })
  async createUser(
    @Payload()
    createUserDto: CreateUserInfraDto,
  ) {
    try {
      const user = await this.application.createUser(
        createUserDto,
        this.uuidService,
        this.passwordHashService,
      );
      return user;
    } catch (error) {
      throw new RpcException(error.message);
    }
  }

  // @MessagePattern({ cmd: 'find_reminder_by_id' })
  // async findById(@Payload('id', ParseUUIDPipe) id: string) {
  //   try {
  //     const reminder = await this.application.findReminderById(id);
  //     return reminder;
  //   } catch (error) {
  //     throw new RpcException(error.message);
  //   }
  // }

  // @MessagePattern({ cmd: 'find_all_reminders' })
  // async findAll() {
  //   try {
  //     const reminders = await this.application.findAllReminders();
  //     return reminders;
  //   } catch (error) {
  //     throw new RpcException(error.message);
  //   }
  // }

  // @MessagePattern({ cmd: 'update_reminder' })
  // async update(@Payload() updateReminder: UpdateReminderInfraDto) {
  //   try {
  //     const reminder = await this.application.updateReminder(
  //       updateReminder.id,
  //       updateReminder,
  //     );
  //     return reminder;
  //   } catch (error) {
  //     throw new RpcException(error.message);
  //   }
  // }

  // @MessagePattern({ cmd: 'delete_reminder' })
  // async delete(@Payload('id', ParseUUIDPipe) id: string) {
  //   try {
  //     const reminder = await this.application.deleteRemider(id);
  //     return reminder;
  //   } catch (error) {
  //     throw new RpcException(error.message);
  //   }
  // }
}
