import { CreateReminderDomainDto } from '../dto/create-reminder.dto';
import { UpdateReminderDomainDto } from '../dto/update-reminder.dto';
import { UuidDomainService } from '../services/uuid.service';

export class ReminderEntity {
  id: string;
  title: string;
  description: string;
  reminderDateTime: string;
  isCompleted: boolean;
  private readonly _errors: Map<string, boolean>;
  private readonly _generateUuidService: UuidDomainService;

  constructor(generateUuidService: UuidDomainService) {
    this._errors = new Map();
    this._generateUuidService = generateUuidService;
    this.isCompleted = false;
  }

  create(data: CreateReminderDomainDto): this {
    this.id = this._generateUuidService.generateUuid();
    this.title = data.title;
    this.description = data.description;
    this.reminderDateTime = data.reminderDateTime;
    this.isCompleted = data.isCompleted;

    this.validate();

    return this;
  }

  validate(): this {
    if (
      this._generateUuidService &&
      this.id.length > 0 &&
      this.validateId() === false
    ) {
      this._errors.set('id', false);
    }
    if (this.validateTitle() === false) {
      this._errors.set('title', false);
    }
    if (this.validateReminderDateTime() === false) {
      this._errors.set('reminderDateTime', false);
    }

    return this;
  }

  validateId(): boolean {
    return this._generateUuidService.validateUuid(this.id);
  }

  validateTitle(): boolean {
    if (this.title?.trim().length > 0) {
      return true;
    }
    return false;
  }

  validateReminderDateTime(): boolean {
    if (this.reminderDateTime?.trim().length > 0) {
      return true;
    }
    return false;
  }

  isValid(): boolean {
    return this._errors.size === 0;
  }

  getErrors(): Map<string, boolean> {
    return this._errors;
  }

  update(data: UpdateReminderDomainDto): this {
    this.title = data.title || this.title;
    this.description = data.description || this.description;
    this.reminderDateTime = data.reminderDateTime || this.reminderDateTime;
    this.isCompleted = data.isCompleted || this.isCompleted;

    this.validate();

    return this;
  }
  //TODO: Editar un recordatorio, marcar un recordatorio como completado
}
