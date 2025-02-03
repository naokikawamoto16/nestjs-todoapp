import { Controller, Request, Post, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() res: Response) {
    const result = await this.authService.login(req.user, res);
    return res.json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify')
  async verify(@Res() res: Response) {
    return res.json({ message: 'verified' });
  }
}
