import { CreateNotificationDomainDto } from '../dto/create-notification.dto';
import { UuidDomainService } from '../services/uuid.service';

export class NotificationEntity {
  id: string;
  userId: string;
  reminderId: string;
  title: string;
  message: string;
  isRead: boolean;
  sentAt: string;
  private readonly _errors: Map<string, boolean>;
  private readonly _uuidService: UuidDomainService;

  constructor(uuidService: UuidDomainService) {
    this._errors = new Map();
    this._uuidService = uuidService;
    this.isRead = false;
  }

  create(data: CreateNotificationDomainDto): this {
    this.id = this._uuidService.generateUuid();
    this.userId = data.userId;
    this.reminderId = data.reminderId;
    this.title = data.title;
    this.message = data.message;
    this.isRead = data.isRead;
    this.sentAt = data.sentAt;

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
    if (this.validateId(this.reminderId) === false) {
      this._errors.set('reminderId', false);
    }
    if (this.validateTitle() === false) {
      this._errors.set('title', false);
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

  isValid(): boolean {
    return this._errors.size === 0;
  }

  getErrors(): Map<string, boolean> {
    return this._errors;
  }
}
