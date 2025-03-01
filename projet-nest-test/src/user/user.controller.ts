import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard/jwt-auth-guard.service';

@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

 
  }




   

