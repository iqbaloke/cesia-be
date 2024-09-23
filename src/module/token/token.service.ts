import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  private blacklistedTokens: string[] = [];

  addTokenToBlacklist(token: string) {
    this.blacklistedTokens.push(token);
  }

  isTokenBlacklisted(token: string): boolean {
    return this.blacklistedTokens.includes(token);
  }
}
