import { CreateUserDomainDto } from '../dto/create-user.dto';
import { LoginUserDomainDto } from '../dto/login-user.dto';
import { PasswordHashDomainService } from '../services/password-hash.service';
import { UuidDomainService } from '../services/uuid.service';

export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  private readonly _errors: Map<string, boolean>;
  private readonly _generateHashService: PasswordHashDomainService;

  constructor(generateHashService: PasswordHashDomainService) {
    this._errors = new Map();
    this._generateHashService = generateHashService;

    this.isActive = true;
  }

  create(
    data: CreateUserDomainDto,
    generateUuidService: UuidDomainService,
  ): this {
    this.id = generateUuidService.generateUuid();
    this.name = data.name;
    this.email = data.email;
    this.password = this._generateHashService.hash(data.password);

    this.validate();

    return this;
  }

  signIn(data: LoginUserDomainDto): boolean {
    this.email = data.email;
    this.password = this._generateHashService.hash(data.password);
    this.validate();

    if (!this.isValid()) {
      return false;
    }
    return true;
  }

  validate(uuidService?: UuidDomainService): this {
    if (
      uuidService &&
      this.id.length > 0 &&
      this.validateId(uuidService) === false
    ) {
      this._errors.set('id', false);
    }
    if (this.name && this.validateName() === false) {
      this._errors.set('name', false);
    }
    if (this.email.length > 0 && this.validateEmail() === false) {
      this._errors.set('email', false);
    }

    if (this.password.length > 0 && this.validatePassword() === false) {
      this._errors.set('password', false);
    }

    return this;
  }

  private validateId(uuidService: UuidDomainService): boolean {
    return uuidService.validateUuid(this.id);
  }

  private validateName(): boolean {
    if (this.name?.trim().length > 0) {
      return true;
    }
    return false;
  }

  private validateEmail(): boolean {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (this.email && pattern.test(this.email)) {
      return true;
    }
    return false;
  }

  private validatePassword(): boolean {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (this.password && pattern.test(this.password)) {
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
