import { Controller, Post, Res, Headers, HttpCode, Body } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { StripeService } from '../../domain/services/stripe.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SWAGGER_AUTH } from '../../shared/swagger-auth';

@ApiTags('Stripe')
@ApiBearerAuth(SWAGGER_AUTH)
@Controller('stripe')
export class StripeController {
  constructor(
    private stripeService: StripeService,
    private configService: ConfigService,
  ) {}

  @Post('create-checkout-session')
  async createCheckoutSession() {
    try {
      const session = await this.stripeService.createCheckoutSession();
      return { id: session.id, url: session.url };
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Post('webhook')
  @HttpCode(200)
  async handleWebhook(
    @Body() body: Buffer,
    @Headers('stripe-signature') signature: string,
  ) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');

    try {
      const event = this.stripeService.constructEventFromPayload(
        body,
        signature,
        webhookSecret,
      );
      if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log(`💰  Payment received! Session ID: ${session.id}`);
      }

      return true;
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return false;
    }
  }
}
