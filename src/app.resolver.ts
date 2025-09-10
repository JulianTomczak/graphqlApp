import { Query, Resolver, Args } from '@nestjs/graphql';
import { AppService } from './app.service';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  hello(): string {
    return this.appService.getHello();
  }

  @Query(() => String)
  greeting(@Args('name') name: string): string {
    return `Hello, ${name}!`;
  }
}