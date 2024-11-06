import { Module } from '@nestjs/common';
import { StripeService } from '../../domain/services/stripe.service';
import { StripeController } from '../../application/controllers/stripe.controller';

@Module({
  providers: [StripeService],
  controllers: [StripeController],
  // providers: [...stripeProviders],
})
export class StripeModule {}
