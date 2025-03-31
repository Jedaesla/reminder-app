import { CreateReminderDomainDto } from '../dto/create-reminder.dto';
import { UuidDomainService } from '../services/uuid.service';

export class ReminderEntity {
  id: string;
  userId: string;
  title: string;
  description: string;
  reminderDateTime: string;
  isCompleted: boolean;
  private readonly _errors: Map<string, boolean>;
  private readonly _uuidService: UuidDomainService;

  constructor(uuidService: UuidDomainService) {
    this._errors = new Map();
    this._uuidService = uuidService;
    this.isCompleted = false;
  }

  create(data: CreateReminderDomainDto): this {
    this.id = this._uuidService.generateUuid();
    this.userId = data.userId;
    this.title = data.title;
    this.description = data.description;
    this.reminderDateTime = data.reminderDateTime;
    this.isCompleted = data.isCompleted;

    this.validate();

    return this;
  }

  validate(): this {
    if (
      this._uuidService &&
      this.id.length > 0 &&
      this.validateId(this.id) === false
    ) {
      this._errors.set('id', false);
    }
    if (this.validateId(this.userId) === false) {
      this._errors.set('userId', false);
    }
    if (this.validateTitle() === false) {
      this._errors.set('title', false);
    }
    if (this.validateReminderDateTime() === false) {
      this._errors.set('reminderDateTime', false);
    }

    return this;
  }

  validateId(id: string): boolean {
    return this._uuidService.validateUuid(id);
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
}
