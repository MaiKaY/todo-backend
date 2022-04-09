import { User } from '../../../0.shared/User';
import { Application } from '../../../2.application/Application';

export class Context {
    constructor(public readonly user: User, public readonly application: Application) {}
}
