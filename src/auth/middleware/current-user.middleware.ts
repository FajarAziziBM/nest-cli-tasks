import {
    Injectable,
    NestMiddleware,
} from '@nestjs/common';

import { UsersService } from '../../users/users.service';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../users/user.entity';

declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) { }

    async use(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        const { userId } = req.session || {};

        if (userId) {
            try {
                const user =
                    await this.usersService.findOne(userId);

                req.currentUser = user;
            } catch (err) {
                req.currentUser = undefined;
            }
        }

        next();
    }
}