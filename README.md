# Threshold Care Check

A free SMS-based check-in system that helps caregivers stay connected with their loved ones through simple, reliable communication.

## Features

- SMS-based check-ins
- Location tracking at check-in time
- Circle of Care management
- Smart scheduling and reminders
- Positive affirmations and special occasion reminders
- Gift marketplace integration

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Prisma (PostgreSQL)
- Twilio for SMS
- NextAuth.js for authentication

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Update the following variables in `.env.local`:
   - `DATABASE_URL`: Your PostgreSQL database URL
   - `TWILIO_ACCOUNT_SID`: Your Twilio Account SID
   - `TWILIO_AUTH_TOKEN`: Your Twilio Auth Token
   - `TWILIO_PHONE_NUMBER`: Your Twilio Phone Number
   - `NEXTAUTH_SECRET`: A random string for NextAuth.js
   - `NEXTAUTH_URL`: Your application URL

5. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 